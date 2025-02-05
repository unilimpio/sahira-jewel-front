const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      //esto se debe cambiar antes de actualizar el build y subir a produccion.
      //target: "https://cmx.unilimpio.com/index.php",
     target: "http://cmxbk/index.php",
      changeOrigin: true,
    })
  );
};
