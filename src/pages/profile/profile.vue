<template>
	<view class="background">
		<view class="profile-box">
			<view class="profile-top">
				<!-- 点击用户信息区域，跳转至登录页，可修改用户信息 -->
				<view class="profile-user" @tap="handleUserTap">
					<image
						class="user-avatar"
						:src="userInfo.avatar || '../../static/avatar.jfif'"
						mode="widthFix"
					></image>
					<view class="user-nickname ellipsis">{{ userInfo.username }}</view>
				</view>
			</view>
			<view class="profile-bottom">
				<view class="item" v-for="item in list" :key="item.id" @tap="handleItemTap(item)">
					<image class="item-left" :src="item.src" mode="widthFix"></image>
					<view class="item-center">{{ item.name }}</view>
					<image class="item-right" src="../../static/forward.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 退出登录按钮 -->
			<button type="primary" @tap="handleLogout">退出登录</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { clearOldInfo } from '../../utils';

const app = getApp();
const { userInfo } = app.globalData;

const orderNo = uni.getStorageSync('orderNo');

const handleUserTap = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	});
};

// 个人中心功能列表
const list = [
	{
		id: 1,
		type: 1,
		name: '我的钱包',
		src: '/static/wallet.png',
		path: '/pages/wallet/wallet'
	},
	{
		id: 2,
		type: 2,
		name: '会员充值',
		src: '/static/vip.png',
		path: '/pages/recharge/recharge'
	},
	{
		id: 3,
		type: 3,
		name: '我的订单',
		src: '/static/order.png',
		path: '/pages/order/order'
	},
	{
		id: 4,
		type: 4,
		name: '奖品兑换',
		src: '/static/change.png',
		path: '/pages/reward/reward'
	},
	{
		id: 5,
		type: 5,
		name: '客服中心',
		src: '/static/support.png',
		path: '/pages/contact/contact'
	},
	{
		id: 6,
		type: 6,
		name: '关于我们',
		src: '/static/about.png',
		path: '/pages/about/about'
	}
];

const handleItemTap = (item) => {
	uni.navigateTo({
		url: item.path
	});
};

// 退出登录，要先校验当前用户是否有正在进行的订单，如果有的话不允许退出，没有再退出
const handleLogout = () => {
	if (orderNo) {
		return uni.showToast({
			title: '您有正在进行的订单，请完成付款后再退出登录！',
			icon: 'none',
			mask: 'true',
			duration: 3000
		});
	}
	clearOldInfo();
};
</script>

<style scoped lang="scss">
.profile-box {
	width: 90%;
	margin: 0 auto;

	.profile-top {
		height: 200rpx;
		background-color: white;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		margin: 20rpx 0;

		.profile-user {
			display: flex;
			align-items: center;

			.user-avatar {
				width: 120rpx;
				height: 120rpx;
				margin: 0 40rpx;
				border-radius: 50%;
				box-shadow: 0 0 20rpx #d1d1d1;
			}

			.user-nickname {
				font-size: 50rpx;
				font-weight: bold;
				margin-right: 40rpx;
				// flex: 1;
				width: 435rpx;
			}
		}
	}

	.profile-bottom {
		background-color: white;
		border-radius: 10rpx;
		margin-bottom: 40rpx;

		.item {
			display: flex;
			height: 100rpx;
			border-bottom: 1rpx solid #f1f1f1;
			box-sizing: border-box;
			align-items: center;

			.item-left,
			.item-right {
				width: 50rpx;
				height: 50rpx;
				margin: 0 20rpx;
			}

			.item-center {
				flex: 1;
			}
		}

		.item:last-child {
			border: none;
		}
	}
}
</style>
