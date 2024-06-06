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
	uni.reLaunch({
		url: '/pages/index/index'
	});
};