const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/legal-case',{
            target: 'http://localhost:9090',
            secure: false, // 指定cookie能否被用户读取
            changeOrigin: true,
            // pathRewrite: {'^/api': ''}
        })
    );
}