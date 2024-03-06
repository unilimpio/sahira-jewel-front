const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://planincent.unilimpio.com/index.php",
      changeOrigin: true,
    })
  );
};
