// 封装请求方法
class Request {
	constructor(domain) {
		this.domain = domain;
	}

	request(url, data, method) {
		return new Promise((resolve, reject) => {
			const token = uni.getStorageSync('token');
			// 先展示Loading框
			uni.showLoading({
				title: 'Loading...',
				mask: true
			});
			// 发送请求
			uni.request({
				url: `${this.domain}${url}`,
				data,
				method,
				timeout: 60000,
				header: {
					'Authorization': token ? `Bearer ${token}` : ''
				},
				success: (res) => {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				},
				complete() {
					uni.hideLoading()
				}
			})
		})
	}

	get(url, data) {
		return this.request(url, data, 'GET')
	}

	post(url, data) {
		return this.request(url, data, 'POST')
	}
}

const myRequest = new Request('http://localhost:9000');

export default myRequest