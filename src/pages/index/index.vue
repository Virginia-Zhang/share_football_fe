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
import api from '../../api';

const longitude = ref(0);
const latitude = ref(0);
const currentMarker = ref(null);
// 是否为扫码借还
const isScan = ref(true);
const markers = ref([]);

const app = getApp();
const { token } = app.globalData;

// 从storage里取出orderNo, userInfo
const storageOrderNo = uni.getStorageSync('orderNo');

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

	// 发送请求，获取场馆列表
	api.getStadiumList().then((result) => {
		// 给每个item添加上width, height属性，并对latitude和longitude的值做处理
		markers.value = result.map((item) => {
			return {
				...item,
				width: 40,
				height: 40,
				// latitude和longitude直接从数据库里取出来都是字符串，需要转成数字
				latitude: +item.latitude,
				longitude: +item.longitude
			};
		});
	});
});

const handleMarkerTap = (e) => {
	// 根据markerId，去markers数组里找到对应的marker，赋值给currentMarker
	const marker = markers.value.find((item) => item.id === e.detail.markerId);
	currentMarker.value = marker;
	console.log('currentMarker:', currentMarker.value);
	// 修改isScan，让marker信息展示出来
	isScan.value = false;
};

// 结束订单后，清空storage和globalData里的orderNo
// 还需要从后端返回的数据中拿到用户的新余额newAmount，再把storage和gloabalData里userInfo中的amount更新为newAmount，实现在用户不重新登陆的情况下更新用户数据的效果，优化用户体验
const clearOrderData = (newAmount) => {
	return new Promise((resolve, reject) => {
		app.globalData.orderNo = '';
		uni.removeStorageSync('orderNo');

		app.globalData.userInfo.amount = newAmount;
		const userInfo = uni.getStorageSync('userInfo');
		userInfo.amount = newAmount;
		uni.setStorageSync('userInfo', userInfo);
		resolve();
	});
};

const handleScan = () => {
	// 先做登录鉴权，没登录的话让用户去登录，登录了再允许扫码创建或结束订单
	if (!token) {
		return uni.showModal({
			title: '尚未登录',
			content: '点击确认进行登录',
			success: (res) => {
				// 点击确认，跳转至登录页
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			}
		});
	}
	uni.scanCode({
		async success(res) {
			// orderNo为空，说明是创建订单
			if (!storageOrderNo) {
				const stadiumId = res.result.split('=')[1];
				const result = await api.createOrder({ stadiumId });
				if (result.code == 0) {
					const orderNo = result.data.orderNo;
					// 创建订单成功，弹窗提示创建成功，并把orderNo保存到globalData和storage
					if (orderNo) {
						uni.showToast({
							title: '创建订单成功！',
							icon: 'none',
							mask: true,
							duration: 3000,
							complete() {
								app.globalData.orderNo = orderNo;
								uni.setStorage({
									key: 'orderNo',
									data: orderNo,
									success(res) {
										uni.reLaunch({
											url: '/pages/index/index'
										});
									}
								});
							}
						});
					} else {
						// 创建订单失败，弹窗提示创建失败
						uni.showToast({
							title: '订单创建失败！请重试',
							icon: 'none',
							mask: true,
							duration: 3000
						});
					}
				} else {
					// 创建订单失败，弹窗提示创建失败
					uni.showToast({
						title: result.message,
						icon: 'none',
						mask: true,
						duration: 3000
					});
				}
			} else {
				// orderNo不为空，说明是结束订单
				const result = await api.finishOrder({ orderNo: storageOrderNo });
				if (result.code == 0) {
					// 判断返回的data的msg是否为“订单完成”，如果是则说明订单结束成功，否则没成功
					if (result.data.msg === '订单完成！') {
						// 订单成功结束，把orderNo从storage, globalData里清除，更新用户余额，并刷新APP
						clearOrderData(result.data.newAmount)
							.then(() => {
								uni.showToast({
									title: result.data.msg,
									icon: 'none',
									mask: true,
									complete() {
										uni.reLaunch({
											url: '/pages/index/index'
										});
									}
								});
							})
							.catch((error) => {
								console.error('Error clearing order data:', error);
							});
					} else {
						// 余额不足无法支付订单，弹窗提示用户去充值
						uni.showToast({
							title: result.data,
							icon: 'none',
							mask: true,
							duration: 3000
						});
					}
				} else {
					// 订单结束失败
					uni.showToast({
						title: result.message,
						icon: 'none',
						mask: true,
						duration: 3000
					});
				}
			}
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
			// 跳转到个人中心页面，跳转前做登录校验
			if (!token) {
				uni.showModal({
					title: '尚未登录',
					content: '点击确认进行登录',
					success: (res) => {
						// 点击确认，跳转至登录页
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				});
			} else {
				uni.navigateTo({
					url: '/pages/profile/profile'
				});
			}
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
