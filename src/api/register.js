// 注册API
import myRequest from '../request'

export default {
	async register(data) {
		const res = await myRequest.post('/register', data);
		if (res.code == 0) {
			uni.showToast({
				title: res.data,
				icon: 'none',
				mask: true
			})
		} else {
			uni.showToast({
				title: res.message === 'user already exists' ? '用户名已被使用！' : res.message,
				icon: 'none',
				mask: true
			})
		}
	}
}