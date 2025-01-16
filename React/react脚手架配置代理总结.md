# react脚手架配置代理总结

  

  

## 方法一

  

> 在package.json中追加如下配置

  

```json

"proxy":"http://localhost:5000"

```

  

说明： 

  

1. 优点：配置简单，前端请求资源时可以不加任何前缀。

2. 缺点：不能配置多个代理。

3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

  

  

## 方法二

  

1. 第一步：创建代理配置文件

  

```

在src下创建配置文件：src/setupProxy.js

```

  

2. 编写setupProxy.js配置具体代理规则：

  

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {

app.use(

"/api1", // 写在createProxyMiddleware外面

createProxyMiddleware({

target: "http://localhost:5000",

changeOrigin: true,

parthRewrite: { "^/api1": "" },

})

);

app.use(

"/api2", // 写在createProxyMiddleware外面

createProxyMiddleware({

target: "http://localhost:5001",

changeOrigin: true,

parthRewrite: { "^/api2": "" },

})

);

};
```

  

说明：

  

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。

2. 缺点：配置繁琐，前端请求资源时必须加前缀。





## 总结

ajax可以向不同的端口号发送请求，但是由于跨域问题无法获得因此在react脚手架中需要使用代理去解决