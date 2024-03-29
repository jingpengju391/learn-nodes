# webpack的初衷

1. webpack 本质上是一个 javascript 现代应用程序的静态模块资源( js/css/html/img/file... )打包工具

### 解决哪些问题

1. 模块在全局工作，污染全局作用域
2. 模块没有私有空间，所有模块内的成员都可以在外部被访问或修改
3. 模块过多会有命名冲突
4. 无法管理模块与模块之间的依赖关系
5. 很难分辨应用函数与模块之间的所属关系

### 简述模块化标准

##### CommonJS/ES Module（ 重点 ）

```js
在浏览器中支持ES Module
在nodejs中支持 CommonJS
nodejs 在最新的提案中也会逐渐趋向于esmodule规范
```

### 模块化思想产生的新的问题

1. 兼容问题 es module 最为新生规范本身就存在很多环境兼容问题
2. 模块化后 会将我们的代码划分出很多模块文件，造成频繁请求服务器，影响应用的工作效率
3. 随着应用的日益复杂像html css js img等都可以看成一个模块

为了解决上面的问题诞生了webpack，一个具有编译能力，把我们的代码转换成兼容性更好的es5同时具备将多个模块打包到一起最后还要具备将除js以外的其他资源当成模块处理的工具



