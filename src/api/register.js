// 注册API
import myRequest from '../request'
import upload from "../upload";

export default {
	async register(data, filePath) {
		try {
			const result = await upload.uploadAvatar('/register', filePath, data);
			if (result.code == 0) {
				uni.showToast({
					title: result.data || '注册成功',
					icon: 'none',
					mask: true,
					duration: 2000
				});
			} else {
				const message = result.message === 'user already exists' ? '用户名已被使用！' : result.message;
				uni.showToast({
					title: message || '注册失败',
					icon: 'none',
					mask: true,
					duration: 2000
				});
			}
		} catch (error) {
			console.error('Error during registration:', error);
			uni.showToast({
				title: '请求失败，请重试',
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	}
}