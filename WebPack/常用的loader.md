# loader

1. Css-loader  : 将css转换为js对象，供js使用，好处是减少文件的请求
2. style-loader : 将解析后的css文件动态的添加到 DOM中，动态生成style 标签

​		-  `css-loader`主要用于解析 CSS 文件，并处理其中的 `@import` 和 `url()` 等语法，以及处理 CSS 模块化等功能。它将 CSS 文件转换为 JavaScript 模块，使得在 JavaScript 中可以引入 CSS 文件，并将其作为模块依赖进行处理。

`style-loader`主要用于将解析后的 CSS 模块注入到 HTML 页面中的 `<style>` 标签中，使得 CSS 样式能够生效。它将 CSS 模块的内容以内联样式的方式插入到 HTML 页面中，或者通过动态创建 `<style>` 标签的方式将 CSS 样式添加到页面中。

为什么要将`css-loader`和`style-loader`一起使用呢？这是因为在使用 Webpack 构建项目时，我们通常需要将 CSS 文件打包到 JavaScript 文件中，并将样式应用到页面上。`css-loader`负责将 CSS 文件转换为 JavaScript 模块，而`style-loader`负责将 CSS 样式注入到页面中。通过将两者结合使用，我们可以在 JavaScript 中引入 CSS 文件，并确保样式能够正确地应用到页面上。

3. Vue-loader : 解析vue模版的
4. Ts-loader: 解析ts模版的
5. Less-loader/sass-loader
6. Post-loader: 处理浏览器css兼容的
7. Babel-loader: 处理浏览器js兼容的

注：在webpack5中 已将style-loader用mini-css-extract-plugin 替换， style-loader 在 顺序不正确，网上较慢的情况下会有白屏问题，mini-css-extract-plugin（loader）换成link引入独立的css文件解决这个问题