// 登录请求方法
import myRequest from '../request'

export default {
	async login(data) {
		const res = await myRequest.post('/login', data);
		if (res.code == 0) {
			return res.data
		} else {
			uni.showToast({
				title: res.message === 'name or password incorrect' ? '用户名或密码不正确！' : res.message,
				icon: 'none',
				mask: true
			})
		}
	}
}