<template>
	<view class="login-box">
		<button class="login-button" open-type="chooseAvatar" @chooseavatar="handleChooseAvatar">
			<image class="login-avatar" :src="avatarUrl"></image>
		</button>
		<view class="login-info">
			<view class="login-label">用户昵称</view>
			<input class="login-nickname" type="nickname" placeholder="请输入您的昵称" @change="handleChange" />
		</view>
		<button class="button" @tap="handleTap">注册登录</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const avatarUrl = ref('https://i0.hdslb.com/bfs/archive/13f13954726fb9b5f2b1d24c37c4ae8517ab7eed.jpg@480w_270h_1c');
const nickname = ref('');

const handleTap = () => {
	console.log('submit', {
		avatarUrl: avatarUrl.value,
		nickname: nickname.value
	});
};

const handleChooseAvatar = (e) => {
	console.log('e', e);
	avatarUrl.value = e.detail.avatarUrl;
};

const handleChange = (e) => {
	console.log('e', e);
	nickname.value = e.detail.value;
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
	margin-bottom: 50rpx;

	.login-label {
		margin: 0 50rpx;
	}

	.login-nickname {
		flex: 1;
		margin-right: 50rpx;
	}
}
</style>
