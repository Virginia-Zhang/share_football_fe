<template>
	<view class="background">
		<view class="about-box">
			<view class="about-top">
				<image class="about-logo" src="../../static/footerball.png" mode="widthFix"></image>
				<view class="about-slogen">强身健体，从我做起</view>
			</view>
			<view class="about-bottom">
				<view class="about-list">
					<view class="about-item" v-for="item in list" :key="item.id" @tap="handleTap(item)">
						<view class="item-left">
							<image :src="item.src" mode="widthFix"></image>
						</view>
						<view class="item-center">{{ item.name }}</view>
						<view class="item-right">{{ item.content }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 关于我们信息列表
const list = [
	{
		id: 1,
		name: '公众号',
		content: '共享足球',
		src: '/static/gzh.png'
	},
	{
		id: 2,
		name: '邮箱',
		content: 'footerball@000.com',
		src: '/static/email.png'
	},
	{
		id: 3,
		name: '客服电话',
		content: '000-00000000',
		src: '/static/phone.png'
	},
	{
		id: 4,
		name: '了解更多',
		content: '000-00000000',
		src: '/static/more.png'
	}
];

const handleTap = (item) => {
	// 点击公众号/邮箱，复制内容到剪切板
	// 点击客服电话/了解更多，调起打电话界面
	switch (item.id) {
		case 1:
		case 2:
			uni.setClipboardData({
				data: item.content,
				success(res) {
					console.log('res', res);
				}
			});
			break;
		case 3:
		case 4:
			uni.makePhoneCall({
				phoneNumber: item.content
			});
			break;
		default:
			break;
	}
};
</script>

<style scoped lang="scss">
.about-box {
	background-color: white;
	width: 90%;
	margin: 0 auto;

	.about-top {
		text-align: center;

		.about-logo {
			width: 160rpx;
			height: 160rpx;
			margin-top: 100rpx;
		}

		.about-slogen {
			height: 100rpx;
			line-height: 100rpx;
		}
	}

	.about-item {
		display: flex;
		height: 100rpx;
		align-items: center;
		border-bottom: 2rpx solid #f1f1f1;
		box-sizing: border-box;

		.item-left {
			width: 60rpx;
			height: 60rpx;
			margin: 0 20rpx;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.item-center {
			flex: 1;
			font-size: 35rpx;
		}

		.item-right {
			width: 400rpx;
			margin: 0 20rpx;
			color: #1296db;
			text-align: right;
			font-size: 35rpx;
		}
	}
}
</style>
