# NodeJs

### 简介

​	Node.js 是一个开源和跨平台的 JavaScript 运行时环境。它是几乎所有类型项目的流行工具！

​	Node.js 在浏览器之外运行 V8 JavaScript 引擎，即 Google Chrome 的核心。这使 Node.js 的性能非常出色。

​	Node.js 应用在单个进程中运行，不会为每个请求创建新线程。Node.js 在其标准库中提供了一组异步 I/O 原语，可防止 JavaScript 代码阻塞，并且通常，Node.js 中的库是使用非阻塞范例编写的，这使得阻塞行为成为例外而不是常态。

### NodeJs编码注意事项

![image-20250214145820642](../../../../AppData/Roaming/Typora/typora-user-images/image-20250214145820642.png)	

1. Node.js中不能使用BOM和DOM的API，可以使用console和定时器API
2. Node.js中的顶级对象为global，也可以使用globalThis访问顶级对象



### Buffer（缓冲器）