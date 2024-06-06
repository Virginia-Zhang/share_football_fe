// 上传文件api
import upload from "../upload";

export default {
	async uploadAvatar(filePath) {
		const result = await upload.uploadAvatar('/upload/avatar', filePath);
		return result;
	}
}