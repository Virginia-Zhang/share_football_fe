<template>
	<view class="cdk-box">
		<view class="input-box">
			<input
				v-model="inputValue"
				class="input"
				type="number"
				:maxlength="10"
				placeholder="请输入您的奖品兑换码"
			/>
		</view>
		<button class="button" @tap="handleTap">立即兑换</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const handleTap = () => {
	console.log('inputValue', inputValue.value);
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
