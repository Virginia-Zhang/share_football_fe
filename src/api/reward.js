// 奖品码兑换api
import myRequest from '../request'

export default {
	async reward(data) {
		try {
			const res = await myRequest.post('/cdkey/exchange', data);
			if (res.code == 0) {
				uni.showToast({
					title: res.data,
					icon: 'none',
					mask: true,
					duration: 2000
				})
			} else {
				uni.showToast({
					title: res.message === 'code invalid' ? '奖品兑换码无效！' : res.message,
					icon: 'none',
					mask: true,
					duration: 2000
				})
			}
		} catch (e) {
			//TODO handle the exception
			console.error('Error during registration:', err);
			uni.showToast({
				title: '请求失败，请重试',
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	}
}