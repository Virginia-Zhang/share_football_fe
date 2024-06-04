<template>
	<view class="login-box">
		<button class="login-button" open-type="chooseAvatar" @chooseavatar="handleChooseAvatar">
			<image class="login-avatar" :src="userInfo.avatar || avatarUrl"></image>
		</button>
		<view class="login-info">
			<view class="login-label">用户名</view>
			<input
				class="login-nickname"
				type="nickname"
				placeholder="请输入您的用户名"
				@change="handleChange"
				:value="userInfo.username"
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

const app = getApp();
const { token, userInfo } = app.globalData;

const avatarUrl = ref('https://i0.hdslb.com/bfs/archive/13f13954726fb9b5f2b1d24c37c4ae8517ab7eed.jpg@480w_270h_1c');
const nickname = ref('');
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
		await api.register(data);
	} else {
		// 登录
		const result = await api.login(data);
		// 把token单独保存到storage和globalData上，剩余的作为userInfo保存到storage和globalData
		const { username, amount, token, avatar } = result;
		const userInfo = { username, amount, avatar };
		app.globalData.token = token;
		app.globalData.userInfo = userInfo;

		uni.setStorage({
			key: 'token',
			data: token
		});
		uni.setStorage({
			key: 'userInfo',
			data: userInfo
		});

		uni.navigateBack();
	}
};

const handleChooseAvatar = (e) => {
	console.log('e', e);
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

const handleModify = () => {
	console.log('modify: ', {
		username: nickname.value,
		avatar: avatarUrl.value
	});
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
