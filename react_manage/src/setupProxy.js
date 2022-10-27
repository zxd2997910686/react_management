const { createProxyMiddleware } = require('http-proxy-middleware');
// 目的是每次请求数据都会代理到端口5000 去取数据
module.exports = function(app) {
  app.use(
    '/ajax',
    createProxyMiddleware({
      target: 'https://i.maoyan.com',
      changeOrigin: true,
    })
  );
};

//如果需要其他的域名，则复制其他模块即可，类似上面