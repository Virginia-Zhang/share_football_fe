<template>
	<view class="background">
		<view v-for="(item, index) in list" :key="item.id" class="question-card">
			<view class="question-title">{{ index + 1 }}. {{ item.title }}</view>
			<view class="question-desc">
				{{ item.desc }}
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getContactQuestionByType } from '../../pages-data';

const list = ref([]);
onLoad((options) => {
	if (options.type) {
		list.value = getContactQuestionByType(+options.type);
	}
});
</script>

<style scoped lang="scss">
.question-card {
	width: 80%;
	margin: 40rpx auto;
	background-color: white;
	padding: 20rpx 5%;
	border: 2rpx solid #f1f1f1;
	box-shadow: 10rpx 10rpx 10rpx 5rpx #d4d4d4;

	.question-title {
		height: 100rpx;
		line-height: 100rpx;
		font-weight: bold;
		font-size: 40rpx;
	}

	.question-desc {
		font-size: 30rpx;
	}
}
</style>
