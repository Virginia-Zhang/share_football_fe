// 客服问题模块请求方法
import myRequest from '../request'

// 请求客服问题列表
const getContactQuestion = async () => {
	const res = await myRequest.get('/contact/list');
	if (res.code == 0) {
		return res.data
	} else {
		uni.showToast({
			title: res.message,
			icon: 'none',
			mask: true
		})
	}
}

export default {
	getContactQuestion
}