<template>
	<view class="cdk-box">
		<view class="input-box">
			<input v-model="inputValue" class="input" placeholder="请输入您的奖品兑换码" />
		</view>
		<button class="button" @tap="handleTap">立即兑换</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api';

const inputValue = ref('');
const handleTap = async () => {
	if (!inputValue.value) {
		return uni.showToast({
			title: '奖品兑换码不能为空！',
			icon: 'none',
			mask: true
		});
	}
	await api.reward({ code: inputValue.value });
};
</script>

<style scoped lang="scss">
.cdk-box {
	width: 100vw;
	height: 100vh;

	.input-box {
		width: 90%;
		margin: 45% auto 100rpx auto;

		.input {
			height: 100rpx;
			border-bottom: 2rpx solid #1296db;
			box-sizing: border-box;
		}
	}
}
</style>
