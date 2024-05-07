<template>
	<view class="map-box">
		<map
			class="map"
			id="map"
			:longitude="longitude"
			:latitude="latitude"
			show-location
			:markers="markers"
			:scale="10"
			@markertap="handleMarkerTap"
			@tap="handleMapTap"
		></map>
		<view class="scan-box scan-title" v-if="isScan" @tap="handleScan">扫码借还</view>
		<view class="scan-box marker-info" v-else>
			<view class="scan-box-left">
				<image :src="currentMarker?.iconPath" mode="widthFix"></image>
			</view>
			<view class="scan-box-center">
				<view class="top scan-box-center-item ellipsis">
					{{ currentMarker?.title || '-' }}
				</view>
				<view class="bottom scan-box-center-item ellipsis">
					{{ currentMarker?.address || '-' }}
				</view>
			</view>
			<view class="scan-box-right" @tap="handleNavTap">
				<image src="/static/nav.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="action-box">
			<image
				v-for="item in actionList"
				:key="item.id"
				:src="item.src"
				mode="widthFix"
				@tap="handleImageTap(item.id)"
			></image>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { markers } from '../../pages-data';

const longitude = ref(0);
const latitude = ref(0);
const currentMarker = ref(null);
// 是否为扫码借还
const isScan = ref(true);

onLoad(() => {
	uni.getLocation({
		success(res) {
			longitude.value = res.longitude;
			latitude.value = res.latitude;
		},
		fail(err) {
			console.log('err', err);
		}
	});
});

const handleMarkerTap = (e) => {
	// 根据markerId，去markers数组里找到对应的marker，赋值给currentMarker
	const marker = markers.find((item) => item.id === e.detail.markerId);
	currentMarker.value = marker;
	console.log('currentMarker:', currentMarker.value);
	// 修改isScan，让marker信息展示出来
	isScan.value = false;
};

const handleScan = () => {
	uni.scanCode({
		success(res) {
			console.log('res', res.result.split('=')[1]);
		}
	});
};

// 点击地图除标记点以外的区域，下方展示“扫码借还”
// 这个功能必须在手机上预览，电脑上有bug
const handleMapTap = () => {
	console.log('handleMapTap');
	// isScan.value = true;
};

// 点击导航图标，跳转到对应的场馆详情，要携带场馆id参数
const handleNavTap = () => {
	uni.navigateTo({
		url: `/pages/ground/ground?id=${currentMarker.value.id}`
	});
};

// 右侧按钮列表
const actionList = [
	{ id: 1, src: '/static/search.png', name: '地图搜索' },
	{ id: 2, src: '/static/support.png', name: '客服中心' },
	{ id: 3, src: '/static/origin.png', name: '回到原点' },
	{ id: 4, src: '/static/profile.png', name: '个人中心' }
];

// 点击右侧按钮的点击事件，传递按钮id
const handleImageTap = (id) => {
	switch (id) {
		case 1:
			// 选择地图上的某个位置，并让地图自动显示该位置
			uni.chooseLocation({
				success(res) {
					console.log('res: ', res);
					longitude.value = res.longitude;
					latitude.value = res.latitude;
				}
			});
			uni.chooseLo;
			break;
		case 2:
			// 跳转到客服页面
			uni.navigateTo({
				url: '/pages/contact/contact'
			});
			break;
		case 3:
			// 回到地图原点
			// 先创建map上下文对象，在调用上下文对象的moveToLocation()回到原点
			const mapContext = uni.createMapContext('map');
			mapContext.moveToLocation();
			break;
		case 4:
			// 跳转到个人中心页面
			uni.navigateTo({
				url: '/pages/profile/profile'
			});
			break;
		default:
			break;
	}
};
</script>

<style lang="scss" scoped>
.map-box {
	position: relative;

	.map {
		width: 100vw;
		height: 100vh;
	}

	.scan-box {
		position: absolute;
		bottom: 100rpx;
		left: 10%;
		width: 80%;
		height: 120rpx;
		background-color: #1296db;
		box-shadow: 0 0 20rpx #1296db;
		border-radius: 20rpx;
		padding: 20rpx 0;
		display: flex;
	}

	.scan-title {
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		font-weight: bold;
		color: #ffffff;
	}

	.marker-info {
		background-color: white;

		.scan-box-left,
		.scan-box-right {
			width: 120rpx;
			margin: 0 18rpx;
		}

		.scan-box-left image,
		.scan-box-right image {
			width: 100%;
			border-radius: 50%;
		}

		.scan-box-right image {
			width: 80%;
			margin: 10% 0 0 10%;
		}

		.scan-box-center {
			margin-left: 10rpx;
			flex: 1;

			.scan-box-center-item {
				height: 60rpx;
				line-height: 60rpx;
				width: 320rpx;
			}

			.top {
				font-weight: bold;
			}

			.bottom {
				font-size: 28rpx;
			}
		}
	}

	.action-box {
		position: absolute;
		right: 10%;
		bottom: 25%;
		width: 90rpx;

		image {
			width: 50rpx;
			padding: 20rpx;
			border-radius: 50%;
			box-shadow: 0 0 20rpx #1296db;
			margin-bottom: 40rpx;
			background-color: #ffffff;
		}
	}
}
</style>
