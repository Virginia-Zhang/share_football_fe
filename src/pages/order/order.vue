<template>
	<view class="background">
		<view class="order-box" v-for="item in 5" :key="item">
			<view class="order-item">场馆名称：虹桥足球场</view>
			<view class="order-item">订单编号：GHSJ87626262</view>
			<view class="order-item">消费金额：0.00</view>
			<view class="order-item">订单状态：已完成</view>
			<view class="order-item">订单时长：00:00:00</view>
			<view class="order-item">开始时间：2023-01-01 00:00:00</view>
			<view class="order-item">结束时间：2023-01-01 00:00:00</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';

// 当页面滑动到底部时触发，可展示下一页的数据，类似于PC项目中的分页功能
onReachBottom(() => {
	console.log('reachBottom');
});
</script>

<style scoped lang="scss">
.order-box {
	width: 80%;
	margin: 0 auto;
	margin-bottom: 30rpx;
	background-color: white;
	padding: 30rpx;

	.order-item {
		height: 50rpx;
		line-height: 50rpx;
	}
}
</style>
