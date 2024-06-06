// 上传文件方法封装
class UploadFile {
	constructor(domain) {
		this.domain = domain
	}

	upload(url, name, filePath, formData) {
		return new Promise((resolve, reject) => {
			const token = uni.getStorageSync('token');
			uni.uploadFile({
				url: `${this.domain}${url}`,
				name,
				filePath,
				formData,
				header: {
					'Authorization': token ? `Bearer ${token}` : ''
				},
				success(res) {
					try {
						// 此处必须用JSON.parse()解析一下，把原来的JSON格式的数据，转为JS对象，否则后面识别返回数据时会出现问题
						resolve(JSON.parse(res.data));
					} catch (error) {
						console.error(error);
						reject(new Error(error));
					}
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}

	uploadAvatar(url, filePath, formData) {
		return this.upload(url, 'avatar', filePath, formData)
	}
}

const upload = new UploadFile('http://localhost:9000');
export default upload