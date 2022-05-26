# withRouter

### 您可以通过 `withRouter` 高阶组件访问 当路由渲染时， `withRouter` 会将已经更新的 `match` ， `location` 和 `history` 属性传递给被包裹的组件。

```
简单理解就是让一般组件具有路由组件的方法和属性。
```

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// 显示当前位置的路径名的简单组件
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <div>You are now at {location.pathname}</div>
    )
  }
}

// 创建一个“connected”的新组件（借用Redux 术语）到路由器。

const ShowTheLocationWithRouter = withRouter(ShowTheLocation)
```

#### 重要提示

withRouter 不支持位置更改，比如 React Redux 的 `connect` 对状态更改的响应。相反，当 location 改变从 `<Router>` 组件传播出去后再重新渲染。这意味着 `withRouter` 不会在路由转换上重新渲染，除非它的父组件重新渲染。如果你正在使用 `withRouter` 来防止由 `shouldComponentUpdate` 阻塞的更新，那么用 `withRouter` 来包裹执行 `shouldComponentUpdate` 的组件是很重要的。例如，当使用 Redux 的时候：

```js
// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))
// or
compose(
  withRouter,
  connect(...)
)(MyComponent)

// This does not
connect(...)(withRouter(MyComponent))
// nor
compose(
  connect(...),
  withRouter
)(MyComponent)
```

请查阅[指南](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md)以获取更多信息。

#### 静态方法和属性

所有 non-react 的特定静态方法和包裹组件的属性都被复制到 “connected” 组件中。

## [Component.WrappedComponent](https://react-router.docschina.org/native/api/withRouter/componentwrappedcomponent)

被包裹的组件作为返回组件上的静态属性 `WrappedComponent` 公开，该属性可用于在其他组件中隔离测试组件。

```jsx
// MyComponent.js
export default withRouter(MyComponent)

// MyComponent.test.js
import MyComponent from './MyComponent'
render(<MyComponent.WrappedComponent location={{...}} ... />)
```

## [wrappedComponentRef: func](https://react-router.docschina.org/native/api/withRouter/wrappedcomponentref-func)

一个作为 `ref` 的属性传递给被包裹组件的函数。

```jsx
class Container extends React.Component {
  componentDidMount() {
    this.component.doSomething()
  }

  render() {
    return (
      <MyComponent wrappedComponentRef={c => this.component = c}/>
    )
  }
}
```