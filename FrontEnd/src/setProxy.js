// setProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(  
    '/todo',
    createProxyMiddleware({
      target: 'http://whitewise.shop',
      changeOrigin: true,
    })
  );
};