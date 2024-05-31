// 场馆模块api请求方法
import myRequest from '../request'

export default {
	// 获取场馆列表
	async getStadiumList() {
		try {
			const res = await myRequest.get('/stadium/list');
			if (res.code == 0) {
				return res.data
			} else {
				uni.showToast({
					title: res.message,
					icon: 'none',
					mask: true
				})
			}
		} catch (e) {
			uni.showToast({
				title: e,
				icon: 'none',
				mask: true
			})
		}
	},

	// 根据id获取场馆信息
	async getStadiumInfoById(id) {
		try {
			const res = await myRequest.get(`/stadium/info/${id}`);
			if (res.code == 0) {
				return res.data
			} else {
				uni.showToast({
					title: res.message,
					icon: 'none',
					mask: true
				})
			}
		} catch (e) {
			//TODO handle the exception
			uni.showToast({
				title: e,
				icon: 'none',
				mask: true
			})
		}
	}
}