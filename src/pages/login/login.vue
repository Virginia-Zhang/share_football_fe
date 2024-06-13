<template>
	<view class="login-box">
		<button class="login-button" open-type="chooseAvatar" @chooseavatar="handleChooseAvatar">
			<image class="login-avatar" :src="avatarUrl"></image>
		</button>
		<view class="login-info">
			<view class="login-label">用户名</view>
			<input
				class="login-nickname"
				type="nickname"
				placeholder="请输入您的用户名"
				@change="handleChange"
				:value="userInfo?.username || ''"
			/>
		</view>
		<!-- 不让登录的用户在当前页面修改密码 -->
		<view class="login-info" v-if="!token">
			<view class="login-label">密码</view>
			<input class="login-pwd" type="password" placeholder="请输入您的密码" @change="handlePwdChange" />
		</view>
		<!-- 用户登录后，不展示注册登录按钮 -->
		<view class="register-link" @tap="handleTap('register')" v-if="!token">没有账号，注册</view>
		<button class="button" @tap="handleTap('login')" v-if="!token">登录</button>
		<!-- 用户登录后，展示修改按钮 -->
		<button class="button" @tap="handleModify" v-else>确认修改</button>
		<!-- 修改密码链接 -->
		<view class="modify-link" @tap="handlePwdTap" v-if="token">想要修改密码？点击这里</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api';
import { clearOldInfo } from '../../utils';

const app = getApp();

const userInfo = uni.getStorageSync('userInfo');
const token = uni.getStorageSync('token');

const avatarUrl = ref(
	userInfo?.avatar || 'https://i0.hdslb.com/bfs/archive/13f13954726fb9b5f2b1d24c37c4ae8517ab7eed.jpg@480w_270h_1c'
);
const nickname = ref(userInfo?.username || '');
const password = ref('');

const handleTap = async (type) => {
	// 校验用户名和密码是否为空
	if (!nickname.value || !password.value)
		return uni.showToast({
			title: '用户名和密码不能为空！',
			icon: 'none',
			mask: true
		});
	// 请求体数据
	const data = {
		username: nickname.value,
		password: password.value
	};
	// 注册
	if (type === 'register') {
		// 用户未选择头像，给用户添加一个默认头像
		if (
			avatarUrl.value ===
			'https://i0.hdslb.com/bfs/archive/13f13954726fb9b5f2b1d24c37c4ae8517ab7eed.jpg@480w_270h_1c'
		) {
			avatarUrl.value = './static/logo.png';
		}
		await api.register(data, avatarUrl.value);
		uni.reLaunch({
			url: '/pages/login/login'
		});
	} else {
		// 登录
		const result = await api.login(data);
		// 把token单独保存到storage和globalData上，剩余的作为userInfo保存到storage和globalData
		const { username, amount, token, avatar } = result;
		const userInfo = { username, amount, avatar };
		app.globalData.token = token;
		app.globalData.userInfo = userInfo;

		uni.setStorageSync('token', token);
		uni.setStorageSync('userInfo', userInfo);

		// 刷新小程序，以获取最新的token和userInfo，否则就要手动重新编译才能拿到
		uni.navigateTo({
			url: '/pages/index/index'
		});
	}
};

const handleChooseAvatar = (e) => {
	avatarUrl.value = e.detail.avatarUrl;
};

const handleChange = (e) => {
	nickname.value = e.detail.value;
};

const handlePwdChange = (e) => {
	password.value = e.detail.value;
};

const handlePwdTap = () => {
	uni.navigateTo({
		url: '/pages/update/update'
	});
};

// 修改用户头像或用户名，或两者都修改
const handleModify = async () => {
	console.log('modify: ', {
		username: nickname.value,
		avatar: avatarUrl.value
	});
	const { username, avatar } = userInfo;
	// username, avatar都没变，直接return
	if (username === nickname.value && avatarUrl.value === avatar) return;
	// avatar变了，username没变，调用uploadAvatar api，更新用户头像
	if (username === nickname.value && avatarUrl.value !== avatar) {
		try {
			const result = await api.uploadAvatar(avatarUrl.value);
			if (result.code == 0) {
				uni.showToast({
					title: result.data || '上传成功',
					icon: 'none',
					mask: true,
					duration: 2000,
					complete() {
						clearOldInfo();
					}
				});
			} else {
				uni.showToast({
					title: result.message || '上传失败',
					icon: 'none',
					mask: true,
					duration: 2000
				});
			}
		} catch (e) {
			//TODO handle the exception
			console.error('Error during registration:', e);
			uni.showToast({
				title: '请求失败，请重试',
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	} else if (username !== nickname.value && avatarUrl.value === avatar) {
		// 用户名变了，头像没变，调用修改用户名的api
		try {
			const result = await api.updateUsername({ newName: nickname.value });
			if (result.code == 0) {
				uni.showToast({
					title: result.data || '修改用户名成功',
					icon: 'none',
					mask: true,
					duration: 2000,
					complete() {
						clearOldInfo();
					}
				});
			} else {
				uni.showToast({
					title: result.message || '修改用户名失败',
					icon: 'none',
					mask: true,
					duration: 2000
				});
			}
		} catch (e) {
			//TODO handle the exception
			console.error('Error during registration:', e);
			uni.showToast({
				title: '请求失败，请重试',
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	} else {
		// 用户名和头像都修改了，调用两个api
		try {
			const res = await api.updateUsername({ newName: nickname.value });
			const result = await api.uploadAvatar(avatarUrl.value);
			if (res.code == 0 && result.code == 0) {
				uni.showToast({
					title: '用户名和头像修改成功',
					icon: 'none',
					mask: true,
					duration: 2000,
					complete() {
						clearOldInfo();
					}
				});
			} else {
				uni.showToast({
					title: '用户名或头像修改失败',
					icon: 'none',
					mask: true,
					duration: 2000
				});
			}
		} catch (e) {
			//TODO handle the exception
			console.error('Error during registration:', e);
			uni.showToast({
				title: '请求失败，请重试',
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	}
};
</script>

<style scoped lang="scss">
.login-button {
	width: 350rpx;
	height: 350rpx;
	border-radius: 50%;
	margin: 50rpx auto;
	padding: 0;

	.login-avatar {
		width: 350rpx;
		height: 348rpx;
		border-radius: 50%;
	}
}

.login-info {
	display: flex;
	height: 120rpx;
	align-items: center;
	margin-bottom: 30rpx;

	.login-label {
		margin: 0 50rpx;
		width: 120rpx;
	}

	.login-nickname,
	.login-pwd {
		flex: 1;
		margin-right: 50rpx;
	}
}

.register-link,
.modify-link {
	text-align: center;
	height: 80rpx;
	line-height: 80rpx;
	text-decoration: underline;
	color: #1296db;
	font-size: 34rpx;
}
</style>
