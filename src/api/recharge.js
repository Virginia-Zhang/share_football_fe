// 充值模块api
import myRequest from '../request'

export default {
	async recharge(data) {
		const result = await myRequest.post('/recharge', data);
		return result;
	}
}