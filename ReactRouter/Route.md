# Route

### Route 组件也许是 React Router 中最重要的组件，它可以让你理解并学习如何使用它。它最基本的职责是在 location 与 Route 的 path 匹配时呈现一些 UI。

```jsx
import { BrowserRouter as Router, Route } from 'react-router-dom'

<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>
```

如果应用程序的位置是 `/` 那么 UI 层次结构将如下所示：

```html
<div>
  <Home/>
  <!-- react-empty: 2 -->
</div>
```

如果应用程序的位置是 /`news` ，那么 UI 层次结构将是：

```html
<div>
  <!-- react-empty: 1 -->
  <NewsFeed/>
</div>
```

#### [Route render methods](https://react-router.docschina.org/web/api/Route/route-render-methods)

`<Route>` 有三种渲染的方法：

- <Route component>
- <Route render>
- <Route children>

#### [Route props](https://react-router.docschina.org/web/api/Route/route-props)

所有三种渲染方法都将通过相同的三个 Route 属性。

- [match](https://react-router.docschina.org/web/api/match)
- [location](https://react-router.docschina.org/web/api/location)
- [history](https://react-router.docschina.org/web/api/history)

#### [component](https://react-router.docschina.org/web/api/Route/component)

只有当位置匹配时才会渲染的 `React` 组件。

```jsx
<Route path="/user/:username" component={User}/> 
const User = ({ match }) => {  return <h1>Hello {match.params.username}!</h1> }
```

当您使用 `component`（而不是 `render` 或 `children` ）Route 使用从给定组件 [`React.createElement`](https://facebook.github.io/react/docs/react-api.html#createelement) 创建新的 [React element](https://facebook.github.io/react/docs/rendering-elements.html)。这意味着，如果您为 `component` 道具提供了内联功能，则每次渲染都会创建一个新组件。这会导致现有组件卸载和安装新组件，而不是仅更新现有组件。当使用内联函数进行内联渲染时，使用 `render` 或者 `children`（如下所示）。

#### [render: func](https://react-router.docschina.org/web/api/Route/render-func)

这允许方便的内联渲染和包裹，而不是上面那种不想要的重新安装的解释

您可以传递一个在位置匹配时调用的函数，而不是使用属性为您创建新的 [React element](https://facebook.github.io/react/docs/rendering-elements.html) [`component`](https://github.com/songda1013/react-router.cn/blob/cn/packages/react-router/docs/api/Route.md#component)，该 `render` 属性接收所有相同的 [route props](https://github.com/songda1013/react-router.cn/blob/cn/packages/react-router/docs/api/Route.md#route-props) 的 `component` 渲染属性。

```jsx
// convenient inline rendering
<Route path="/home" render={() => <div>Home</div>}/>

// wrapping/composing
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```

**警告：** `<Route component>` 优先于 `<Route render>` 因此不要在同一个 `<Route>` 使用两者。

#### [children: func](https://react-router.docschina.org/web/api/Route/children-func)

有时你需要渲染路径是否匹配位置。在这些情况下，您可以使用函数 `children` 属性，它的工作原理与渲染完全一样，不同之处在于它是否存在匹配。

`children` 渲染道具接收所有相同的 [route props](https://github.com/songda1013/react-router.cn/blob/cn/packages/react-router/docs/api/Route.md#route-props) 作为 `component` 和 `render` 方法，如果 Route 与 URL 不匹配，`match` 则为 `null` ，这允许你动态调整你的 UI 界面，基于路线是否匹配，如果路线匹配我们则添加一个 `active` 类

这对动画也很有用：

```jsx
<ul>
  <ListItemLink to="/somewhere"/>
  <ListItemLink to="/somewhere-else"/>
</ul>
const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)
<Route children={({ match, ...rest }) => (
  {/* Animate will always render, so you can use lifecycles
      to animate its child in and out */}
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```

**警告：**`<Route component>` 和 `<Route render>` 优先于 `<Route children>` ，因此不要在同一个 `<Route>` 中使用多个。

#### [path: string](https://react-router.docschina.org/web/api/Route/path-string)

任何 [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) 可以解析的有效的 URL 路径

```jsx
<Route path="/users/:id" component={User}/>
```

没有`path` *始终*匹配的路线。

#### [exact: bool](https://react-router.docschina.org/web/api/Route/exact-bool)

如果为 `true`，则只有在路径完全匹配 `location.pathname` 时才匹配。

```jsx
<Route exact path="/one" component={About}/>
```

|  path  | location.pathname |  exact  | matches? |
| :----: | :---------------: | :-----: | :------: |
| `/one` |    `/one/two`     | `true`  |    no    |
| `/one` |    `/one/two`     | `false` |   yes    |

#### [strict: bool](https://react-router.docschina.org/web/api/Route/strict-bool)

如果为 `true` 当真实的路径具有一个斜线将只匹配一个斜线location.pathname，如果有更多的URL段 `location.pathname` ，将不起作用

```jsx
<Route strict path="/one/" component={About}/>
```

|  path   | location.pathname | matches? |
| :-----: | :---------------: | :------: |
| `/one/` |      `/one`       |    no    |
| `/one/` |      `/one/`      |   yes    |
| `/one/` |    `/one/two`     |   yes    |

**警告：**可以使用 `strict` 来强制执行 `location.pathname` 没有结尾斜杠，但为了执行此操作，`strict` 和 `exact` 必须都是 `true` 。

```jsx
<Route exact strict path="/one" component={About}/>
```

|  path  | location.pathname | matches? |
| :----: | :---------------: | :------: |
| `/one` |      `/one`       |   yes    |
| `/one` |      `/one/`      |    no    |
| `/one` |    `/one/two`     |    no    |

#### [location: object](https://react-router.docschina.org/web/api/Route/location-object)

一个 `<Route>` 元素尝试其匹配 `path` 到当前的历史位置（通常是当前浏览器 URL ）。但是，也可以通过[`location`](https://github.com/songda1013/react-router.cn/blob/cn/packages/react-router/docs/api/location.md) 一个不同 `pathname` 的匹配。

如果您需要将 `<Route>` 与当前历史记录位置以外的位置相匹配，则此功能非常有用，如 [Animated Transitions](https://reacttraining.com/react-router/web/example/animated-transitions) 示例中所示。

如果 `<Route>` 元素包裹在 `<Switch>` 中，并且匹配地址传递给 `<Switch>`（或者当前的历史位置），那么传递给 `<Route>` 的地址属性将会被传递给 `<Switch>` 的地址属性覆盖（[在这里给出](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Switch.js#L51)）

#### [sensitive: bool](https://react-router.docschina.org/web/api/Route/sensitive-bool)

如果路径区分大小写，则为 `true` ，则匹配。

```jsx
<Route sensitive path="/one" component={About}/>
```

|  path  | location.pathname | sensitive | matches? |
| :----: | :---------------: | :-------: | :------: |
| `/one` |      `/one`       |  `true`   |   yes    |
| `/One` |      `/one`       |  `true`   |    no    |
| `/One` |      `/one`       |  `false`  |   yes    |