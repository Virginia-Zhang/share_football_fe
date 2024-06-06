<template>
	<view class="recharge-box">
		<view class="recharge-desc">
			当前账户余额：
			<text>{{ userInfo.amount }}</text>
			元
		</view>
		<view class="recharge-list">
			<button
				:class="{ 'recharge-item': true, active: activeIndex === index }"
				v-for="(item, index) in list"
				:key="item.id"
				@tap="handleItemTap(index)"
			>
				￥{{ item.amount }}
			</button>
		</view>
		<button class="button" @tap="handleBtnTap">立即充值</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api/';
import { clearOldInfo } from '../../utils';

const userInfo = uni.getStorageSync('userInfo');

const list = [
	{ id: 1, amount: 10 },
	{ id: 2, amount: 20 },
	{ id: 3, amount: 50 },
	{ id: 4, amount: 100 }
];

const activeIndex = ref(0);

const handleItemTap = (index) => {
	activeIndex.value = index;
};

const handleBtnTap = () => {
	// 根据activeIndex去list里找到用户当前点击的按钮item
	const activeItem = list.find((_, index) => index === activeIndex.value);
	// 弹框向用户确认是否充值，显示充值金额
	uni.showModal({
		title: '确认充值',
		content: `充值金额为 ${activeItem.amount} 元`,
		success: function (res) {
			if (res.confirm) {
				api.recharge({ amount: activeItem.amount }).then((res) => {
					clearOldInfo();
				});
			}
		}
	});
};
</script>

<style scoped lang="scss">
.recharge-box {
	width: 80%;
	margin: 0 auto;
	padding-top: 50rpx;

	.recharge-desc {
		font-weight: bold;
		margin-bottom: 50rpx;

		text {
			color: #1296db;
		}
	}

	.recharge-list {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 80rpx;

		.recharge-item {
			width: 45%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			margin-bottom: 40rpx;
			box-sizing: border-box;
			border: 2rpx solid #d1d1d1;
		}

		.recharge-item:nth-child(odd) {
			margin-left: -2rpx;
		}

		.recharge-item:nth-child(even) {
			margin-right: -2rpx;
		}

		.active {
			border-color: #1296db;
			color: #1296db;
		}
	}
}
</style>
