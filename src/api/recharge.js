// 充值模块api
import myRequest from '../request'

export default {
	async recharge(data) {
		try {
			const result = await myRequest.post('/recharge', data);
			if (result.code == 0) {
				uni.showToast({
					title: result.data || '充值成功',
					icon: 'none',
					mask: true,
					duration: 2000
				});
			} else {
				const message = result.message === 'amount invalid' ? '充值金额不能为空！' : result.message;
				uni.showToast({
					title: message || '充值失败',
					icon: 'none',
					mask: true,
					duration: 2000
				});
			}
		} catch (e) {
			//TODO handle the exception
			console.error('Error during registration:', e);
			uni.showToast({
				title: '请求失败，请重试',
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	}
}