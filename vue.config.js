module.exports={
	configureWebpack:{
		devServer:{
			proxy:{
				'/exchange': {
					target: 'https://api.jisuapi.com',
					changeOrigin: true
				},
				'/background': {
					target: 'https://api.qeeniao.com',
					changeOrigin: true
				},
				'/getConfiguration': {
					target: 'https://feedback-api.aliyuncs.com',
					changeOrigin: true
				}
			}
		}
	}
}