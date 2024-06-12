// 登录请求方法
import myRequest from '../request'

export default {
	async login(data) {
		const res = await myRequest.post('/login', data);
		if (res.code == 0) {
			// 登录成功后，把登录时间记录到storage里，方便后面计算登录时长用
			uni.setStorageSync('loginTime', Date.now());
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