// 更新用户信息模块api
import myRequest from "../request";

export default {
	// 更新用户名
	async updateUsername(data) {
		const res = await myRequest.post('/update/username', data);
		return res;
	},
	// 更新用户密码
	async updateUserPwd(data) {
		const res = await myRequest.post('/update/password', data);
		return res;
	}
}