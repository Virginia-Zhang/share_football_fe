// 订单模块API
import myRequest from "../request";

export default {
	// 创建订单
	async createOrder(data) {
		const res = await myRequest.post('/order/create', data);
		return res;
	},

	// 结束订单
	async finishOrder(data) {
		const res = await myRequest.post('/order/finish', data);
		return res;
	},

	// 订单列表
	async orderList() {
		const res = await myRequest.get('/order/list');
		if (res.code == 0) {
			return res.data
		} else {
			uni.showToast({
				title: res.message,
				icon: 'none',
				mask: true,
				duration: 3000
			})
		}
	}
}