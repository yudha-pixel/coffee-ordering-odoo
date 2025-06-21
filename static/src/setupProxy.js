// my_module/static/src/react_app/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/web', '/longpolling', '/session'], // Add any other odoo routes you need
    createProxyMiddleware({
      target: 'http://localhost:8069', // Your Odoo server address
      changeOrigin: true,
    })
  );
};