
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {

app.use("/api1", // 写在createProxyMiddleware外面
createProxyMiddleware({

target: "http://localhost:5000",

changeOrigin: true,

parthRewrite: { "^/api1": "" },

})

);

};