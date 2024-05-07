<script>
export default {
	onLaunch: function () {
		console.log('App Launch');
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.background {
	background-color: #f1f1f1;
	width: 100vw;
	height: 100vh;
	padding-top: 10rpx;
}

.button {
	width: 368rpx;
	color: white;
	background-color: #1296db;
	font-weight: bold;
	letter-spacing: 2rpx;
	margin: 0 auto;
}
</style>
