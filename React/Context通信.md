# 过时的 Context

> 注意：
>
> 过时的 context API 会在未来的主要版本中被移除。 使用 16.3 版本中引入的 [新的 context API](https://zh-hans.reactjs.org/docs/context.html)。 过时的 API 将会继续在所有 16.x 版本中工作。

## 如何使用 Context

假设你有这样一个结构：

```jsx
// 创建context对象 
const XxxContext = React.createContext() // 首字母大写
// 渲染时在外部包裹 xxxContext.Provider 通用value属性给后代组件传递数据
<XxxContext.Provider value="数据">
      // 子组件
</XxxContext.Provider>
// 后代组件读取数据
// 1. 仅使用于类组件
static contextType = xxxContext // 声明接受context
this.context //读取 context 的value
// 2. 函数组件与类组件都可以用
<XxxContext>
  {
  	value => ( // value 就是 context中的value
  		// 要显示的内容
  	)
	}
</XxxContext>

```

