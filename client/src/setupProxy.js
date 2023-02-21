const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://f84e-1-227-164-12.jp.ngrok.io",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
