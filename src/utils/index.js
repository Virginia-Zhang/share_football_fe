// 修改用户信息完毕，删除storage和globalData保存的原有的token和userInfo，刷新APP，让用户重新登录
export const clearOldInfo = () => {
	const app = getApp();
	app.globalData.token = null;
	app.globalData.userInfo = {
		username: '',
		avatar: '',
		amount: ''
	};
	uni.removeStorage({
		key: 'token'
	});
	uni.removeStorage({
		key: 'userInfo'
	});
	uni.removeStorage({
		key: 'loginTime'
	});
	uni.reLaunch({
		url: '/pages/index/index'
	});
};

// 验证登录是否过期，有效时长为24小时
export const verifyLogin = () => {
	const loginTime = uni.getStorageSync('loginTime');
	// 等用户登录后，再计算登录时长
	if (loginTime) {
		const duration = Date.now() - loginTime;
		// 登录时长大于24小时，弹窗提示“登录已过期，请重新登录”，清空storage和globalData里保存的旧的token和userInfo还有loginTime，然后再重定向至登录页面
		if (duration > 24 * 60 * 60 * 1000) {
			uni.showToast({
				title: '登录已过期，请重新登录',
				icon: 'none',
				mask: true,
				duration: 2000
			});
			setTimeout(() => {
				clearOldInfo();
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}, 2000)
		}
	}
}