# single-spa-vue

Single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。 使用 single-spa 进行前端架构设计可以带来很多好处，例如:

- 在同一页面上[使用多个前端框架](https://zh-hans.single-spa.js.org/docs/ecosystem#help-for-frameworks) [而不用刷新页面](https://zh-hans.single-spa.js.org/docs/building-applications) ([React](https://zh-hans.single-spa.js.org/docs/ecosystem-react), [AngularJS](https://zh-hans.single-spa.js.org/docs/ecosystem-angularjs), [Angular](https://zh-hans.single-spa.js.org/docs/ecosystem-angular), [Ember](https://zh-hans.single-spa.js.org/docs/ecosystem-ember))
- 独立部署每一个单页面应用
- 新功能使用新框架，旧的单页应用不用重写可以共存
- 改善初始加载时间，延迟加载代码



##### 缺点

- 不够灵活不能动态加载js
- 样式不隔离没有js沙箱机制

```
综合上述两点，项目中一般应用的都是qiankun
```

##### 解决css隔离问题

1. BEM 约定项目前缀，缺点可能打破约定
2. CSS-modules 打包后生成不冲突的选择其名
3. shadow DOM 真正意义上的隔离
4. css-in-js

###### example - shadow DOM

```html
<div>
  <p>hello</p>
  <div id="shadow"></div>
</div>
```

```js
// shadow bom的api
const shadowDom = shadow.attachShadow({mode:'closed'})
const pElem = document.craeteElement('p')
const styleElm = document.craeteElement('style')
pElem.innerHTML = 'hello2'
styleElm.textContent = `p{color:red}`
shadowDom.appendChild(styleElm)
shadowDom.appendChild(pElem)
// 可以解决隔离css问题

// 但是当把标签插入隔离层外隔离失效，例如vue3的teleport api 指定插入位置
```















