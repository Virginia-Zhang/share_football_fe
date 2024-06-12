<template>
	<view class="update-box">
		<view class="update-item">
			<view class="update-item-label">原密码</view>
			<input
				class="update-item-pwd"
				type="password"
				placeholder="请输入您的原密码"
				@change="handleOldPwdChange"
			/>
		</view>
		<view class="update-item">
			<view class="update-item-label">新密码</view>
			<input
				class="update-item-pwd"
				type="password"
				placeholder="请输入您的新密码"
				@change="handleNewPwdChange"
			/>
		</view>
		<view class="update-item">
			<view class="update-item-label">确认密码</view>
			<input class="update-item-pwd" type="password" placeholder="请再次输入新密码" @change="handleConfirmPwd" />
		</view>
		<button @tap="handleUpdate" class="update-btn">确认修改</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api';
import { clearOldInfo, verifyLogin } from '../../utils';
import { onShow } from '@dcloudio/uni-app';

const oldPwd = ref('');
const newPwd = ref('');
const confirmPwd = ref('');

onShow(() => {
	verifyLogin();
});

const handleOldPwdChange = (e) => {
	oldPwd.value = e.detail.value;
};

const handleNewPwdChange = (e) => {
	newPwd.value = e.detail.value;
};

const handleConfirmPwd = (e) => {
	confirmPwd.value = e.detail.value;
};

const handleUpdate = () => {
	// 校验是否为空
	if (!oldPwd.value || !newPwd.value || !confirmPwd.value) {
		return uni.showToast({
			title: '输入框不能为空！',
			icon: 'none',
			mask: true
		});
	}
	// 校验新密码和确认密码是否一致
	if (newPwd.value !== confirmPwd.value) {
		return uni.showToast({
			title: '新密码和确认密码不一致，请重新输入！',
			icon: 'none',
			mask: true
		});
	}
	// 弹出模态框，询问用户是否确认修改密码，点击确认了再提交请求
	uni.showModal({
		title: '确认修改密码',
		content: '确认修改密码？',
		success(res) {
			if (res.confirm) {
				const data = {
					oldPwd: oldPwd.value,
					newPwd: newPwd.value
				};
				api.updateUserPwd(data)
					.then((result) => {
						if (result.code == 0) {
							uni.showToast({
								title: result.data || '更新密码成功',
								icon: 'none',
								mask: true,
								duration: 2000,
								complete() {
									clearOldInfo();
								}
							});
						} else {
							const msg = result.message === 'oldPwd incorrect' ? '旧密码输入错误！' : result.message;
							uni.showToast({
								title: msg || '更新密码失败',
								icon: 'none',
								mask: true,
								duration: 2000
							});
						}
					})
					.catch((e) => {
						console.error('Error during registration:', e);
						uni.showToast({
							title: '请求失败，请重试',
							icon: 'none',
							mask: true,
							duration: 2000
						});
					});
			}
		}
	});
};
</script>

<style scoped lang="scss">
.update-box {
	width: 80%;
	margin: 100rpx auto;

	.update-item {
		display: flex;
		margin: 80rpx 0;

		&-label {
			width: 200rpx;
			margin-right: 60rpx;
		}

		&-pwd {
			flex: 1;
		}
	}

	.update-btn {
		margin-top: 50rpx;
	}
}
</style>
