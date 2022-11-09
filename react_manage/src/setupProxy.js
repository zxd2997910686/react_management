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
// https://i.maoyan.com/ajax/mostExpected?limit=10&offset=0&token=&optimus_uuid=D307AA30560A11EDACB5E5D6D21182C88F40FB5574DA40BA88B434F852636749&optimus_risk_level=71&optimus_code=10
//如果需要其他的域名，则复制其他模块即可，类似上面