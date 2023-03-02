const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://13.209.10.249:8080/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
