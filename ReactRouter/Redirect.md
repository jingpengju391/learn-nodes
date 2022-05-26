# Redirect

### 渲染 `<Redirect>` 将使导航到一个新的地址。这个新的地址会覆盖 history 栈中的当前地址，类似服务器端（HTTP 3xx）的重定向。

```jsx
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

## [to: string](https://react-router.docschina.org/native/api/Redirect/to-string)

重定向到的 URL，可以是任何 [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 能够理解有效 URL 路径。在 `to` 中使用的 URL 参数必须由 `from` 覆盖。

```jsx
<Redirect to="/somewhere/else" />
```

## [to: object](https://react-router.docschina.org/native/api/Redirect/to-object)

重定向到的 location，`pathname` 可以是任何 [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 能够理解的有效的 URL 路径。

```jsx
<Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/>
```

`state` 对象可以通过重定向到组件中的 `this.props.locations.state` 来访问。这个新的 `referrer` 键（它不是一个特殊的名字）将通过路径名 `'/login'` 指向 `Login` 组件中的 `this.props.locations.state.referrer` 来访问。

## [push: bool](https://react-router.docschina.org/native/api/Redirect/push-bool)

当 `true` 时，重定向会将新地址推入 history 中，而不是替换当前地址。

```jsx
<Redirect push to="/somewhere/else" />
```

## [from: string](https://react-router.docschina.org/native/api/Redirect/from-string)

重定向 from 的路径名。可以是任何 [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 能够识别的有效的 URL 路径。所有匹配的 URL 参数都提供给 `to` 中的模式。必须包含在 `to` 中使用的所有参数。 `to` 未使用的其他参数将被忽略。

这只能用于在 `<Redirect>` 内部渲染 `<Switch>` 时匹配地址。有关更多详情，请查阅参阅 [``](https://react-router.docschina.org/native/api/Switch/children-node)。

```jsx
<Switch>
  <Redirect from="/old-path" to="/new-path" />
  <Route path="/new-path" component={Place} />
</Switch>
```

## [exact: bool](https://react-router.docschina.org/native/api/Redirect/exact-bool)

完全匹配 `from`；相当于 [Route.exact](https://react-router.docschina.org/native/api/Route/exact-bool)。

## [strict: bool](https://react-router.docschina.org/native/api/Redirect/strict-bool)

严格匹配 `from`；相当于 [Route.strict](https://react-router.docschina.org/native/api/Route/strict-bool)。

### 普遍用法

```jsx
// 注意一般我们用Redirect 卸载最下方
<Switch>
  <Route path="/home" component={Home} />
  <Route path="/news" component={News} />
  <Route path="/children" component={Children} />
  <Redirect to="/Home" />
</Switch>
```

