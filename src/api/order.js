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
	}
}