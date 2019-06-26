module.exports = {
	devServer:{
		proxy: {
		  // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
		  "/api": {
		    target: "http://39.97.33.178",
		    changeOrigin: true
		  }
		}
	}
}
