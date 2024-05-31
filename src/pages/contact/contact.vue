<template>
	<view class="contact-box">
		<view class="contact-top">
			<view class="contact-top-title">24H 在线为您答疑解惑</view>
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="contact" @contact="handleContactTap" class="button">在线客服</button>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<button @tap="handlePhoneCall" class="button">拨打电话</button>
			<!-- #endif -->
		</view>
		<view class="contact-bottom">
			<view class="contact-bottom-title">常见问题</view>
			<view class="contact-bottom-list">
				<view class="item" v-for="item in contactQuestion" :key="item.id" @tap="handleItemTap(item)">
					<image class="image" :src="item.src" mode="widthFix"></image>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
// import { contactQuestion } from '../../pages-data';
import { onLoad } from '@dcloudio/uni-app';
import api from '../../api';

const contactQuestion = ref([]);
const app = getApp();

onLoad(() => {
	api.getContactQuestion().then((result) => {
		// result数组里的每项还缺src属性，即每个问题分类对应的icon，需要前端手动添加上
		let src;
		// 把contactQuestion数组也放到全局变量上，以方便question.vue使用
		app.globalData.contactQuestion = contactQuestion.value = result.map((item) => {
			switch (item.id) {
				case 1:
					src = '/static/flow.png';
					break;
				case 2:
					src = '/static/machine.png';
					break;
				case 3:
					src = '/static/deposit.png';
					break;
				case 4:
					src = '/static/order.png';
					break;
				case 5:
					src = '/static/repair.png';
					break;
				case 6:
					src = '/static/more.png';
					break;
			}
			return {
				...item,
				src
			};
		});
	});
});

const handleItemTap = (item) => {
	uni.navigateTo({
		url: `/pages/question/question?type=${item.id}`
	});
};

const handleContactTap = (e) => {
	console.log(e);
};

const handlePhoneCall = () => {
	console.log('call');
};
</script>

<style scoped lang="scss">
.contact-box {
	background-color: #f1f1f1;

	.contact-top {
		height: 300rpx;
		text-align: center;
		/* background-color: red; */
		background-color: white;
		padding: 20rpx 0;

		&-title {
			height: 150rpx;
			line-height: 150rpx;
			font-weight: bold;
		}
	}

	.contact-bottom {
		margin-top: 20rpx;
		background-color: white;

		&-title {
			height: 100rpx;
			line-height: 100rpx;
			font-weight: bold;
			padding-left: 20rpx;
			border-bottom: 2rpx solid #f1f1f1;
			box-sizing: border-box;
		}

		&-list {
			display: flex;
			flex-wrap: wrap;

			.item {
				width: 50%;
				/* background-color: #1296db; */
				height: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 2rpx solid #f1f1f1;
				box-sizing: border-box;

				.image {
					width: 50rpx;
					height: 50rpx;
					margin-right: 10rpx;
				}
			}

			// 构造出中间的垂直分割线，奇数序号的item给右边框，偶数的给左边框
			.item:nth-child(odd) {
				border-right: 2rpx solid #f1f1f1;
				box-sizing: border-box;
			}

			.item:nth-child(even) {
				border-left: 2rpx solid #f1f1f1;
				box-sizing: border-box;
			}

			// 构造出行与行间的水平分割线，给每个item都加下边框，最后一行的两个除外
			.item:last-child,
			.item:nth-last-child(2) {
				border-bottom: none;
			}
		}
	}
}
</style>
