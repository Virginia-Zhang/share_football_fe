<template>
	<view class="background">
		<view class="order-box" v-for="item in orderList" :key="item.id">
			<view class="order-item">场馆名称：{{ item.stadium.title }}</view>
			<view class="order-item">订单编号：{{ item.orderNo }}</view>
			<view class="order-item">消费金额：{{ item.amount }}元</view>
			<view class="order-item">订单状态：{{ item.status }}</view>
			<view class="order-item">订单时长：{{ item.duration }}</view>
			<view class="order-item ellipsis">开始时间：{{ item.createAt }}</view>
			<view class="order-item ellipsis">结束时间：{{ item.updateAt }}</view>
		</view>
		<view class="border-line">------------ 我是有底线的 ------------</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import api from '../../api/index.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const orderList = ref([]);

// 把status转换为对应的文字描述
const statusConvert = (status, time) => {
	// 判断status为0时，究竟是订单完成还是订单创建失败
	if (status === 0) {
		// time不为null，说明订单完成
		if (time != null) {
			return '订单完成';
		} else {
			return '创建失败';
		}
	}
	if (status === 1) return '订单进行中';
	if (status === 2) return '订单已结束，尚未付款';
};

// 计算订单时长，并转换为hh:mm:ss的格式
const durationConvert = (before, end) => {
	// 计算时间差
	const diff = end - before;
	// 转换成时分秒
	const totalSeconds = Math.floor(diff / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);
	// 使用字符串填充保证两位数格式
	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(seconds).padStart(2, '0');
	// 格式化为 HH:mm:ss
	const formattedDuration = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	return formattedDuration;
};

onLoad(async () => {
	const res = await api.orderList();
	orderList.value = res.map((item) => {
		return {
			...item,
			status: statusConvert(item.status, item.time),
			createAt: dayjs(item.createAt).format('YYYY-MM-DD HH:mm:ss'),
			updateAt: dayjs(item.updateAt).format('YYYY-MM-DD HH:mm:ss'),
			duration: durationConvert(new Date(item.createAt), new Date(item.updateAt))
		};
	});
});

// 当页面滑动到底部时触发，可展示下一页的数据，类似于PC项目中的分页功能
onReachBottom(() => {
	console.log('reachBottom');
});
</script>

<style scoped lang="scss">
.order-box {
	width: 80%;
	margin: 0 auto;
	margin-bottom: 50rpx;
	background-color: white;
	padding: 30rpx;
	border: 2rpx solid #f1f1f1;
	box-shadow: 10rpx 10rpx 10rpx 5rpx #d4d4d4;

	.order-item {
		height: 50rpx;
		line-height: 50rpx;
	}
}

.border-line {
	text-align: center;
	padding-bottom: 40rpx;
}
</style>
