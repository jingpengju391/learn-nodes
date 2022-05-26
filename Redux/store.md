# store

**Store** 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 方法获取 state；
- 提供 [`dispatch(action)`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 方法更新 state；
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 注册监听器;
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 返回的函数注销监听器。

### [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState)

返回应用当前的 state 树。
它与 store 的最后一个 reducer 返回值相同。

### [`dispatch(action)`](https://www.redux.org.cn/docs/api/Store.html#dispatch)

分发 action。这是触发 state 变化的惟一途径。

会使用当前 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 的结果和传入的 `action` 以同步方式的调用 store 的 reduce 函数。返回值会被作为下一个 state。从现在开始，这就成为了 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 的返回值，同时变化监听器(change listener)会被触发。

> ##### Flux 用户使用注意
>
> 当你在 [reducer](https://www.redux.org.cn/docs/Glossary.html#reducer) 内部调用 `dispatch` 时，将会抛出错误提示“Reducers may not dispatch actions.（Reducer 内不能 dispatch action）”。这就相当于 Flux 里的 “Cannot dispatch in a middle of dispatch（dispatch 过程中不能再 dispatch）”，但并不会引起对应的错误。在 Flux 里，当 Store 处理 action 和触发 update 事件时，dispatch 是禁止的。这个限制并不好，因为他限制了不能在生命周期回调里 dispatch action，还有其它一些本来很正常的地方。
>
> 在 Redux 里，只会在根 reducer 返回新 state 结束后再会调用事件监听器，因此，你可以在事件监听器里再做 dispatch。惟一使你不能在 reducer 中途 dispatch 的原因是要确保 reducer 没有副作用。如果 action 处理会产生副作用，正确的做法是使用异步 [action 创建函数](https://www.redux.org.cn/docs/Glossary.html#action-creator)。

#### 参数

1. `action` (*Object*†): 描述应用变化的普通对象。Action 是把数据传入 store 的惟一途径，所以任何数据，无论来自 UI 事件，网络回调或者是其它资源如 WebSockets，最终都应该以 action 的形式被 dispatch。按照约定，action 具有 `type` 字段来表示它的类型。type 也可被定义为常量或者是从其它模块引入。最好使用字符串，而不是 [Symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 作为 action，因为字符串是可以被序列化的。除了 `type` 字段外，action 对象的结构完全取决于你。参照 [Flux 标准 Action](https://github.com/acdlite/flux-standard-action) 获取如何组织 action 的建议。

#### 返回值

(Object†): 要 dispatch 的 action。

#### 注意

† 使用 [`createStore`](https://www.redux.org.cn/docs/api/createStore.html) 创建的 “纯正” store 只支持普通对象类型的 action，而且会立即传到 reducer 来执行。

但是，如果你用 [`applyMiddleware`](https://www.redux.org.cn/docs/api/applyMiddleware.html) 来套住 [`createStore`](https://www.redux.org.cn/docs/api/createStore.html) 时，middleware 可以修改 action 的执行，并支持执行 dispatch [intent（意图）](https://www.redux.org.cn/docs/Glossary.html#intent)。Intent 一般是异步操作如 Promise、Observable 或者 Thunk。

Middleware 是由社区创建，并不会同 Redux 一起发行。你需要手动安装 [redux-thunk](https://github.com/gaearon/redux-thunk) 或者 [redux-promise](https://github.com/acdlite/redux-promise) 库。你也可以创建自己的 middleware。

想学习如何描述异步 API 调用？看一下 action 创建函数里当前的 state，执行一个有副作用的操作，或者以链式操作执行它们，参照 [`applyMiddleware`](https://www.redux.org.cn/docs/api/applyMiddleware.html) 中的示例。

```js
import { createStore } from 'redux'
let store = createStore(todos, [ 'Use Redux' ])

function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}

store.dispatch(addTodo('Read the docs'))
store.dispatch(addTodo('Read about the middleware'))
```

### [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe)

```js
function select(state) {
  return state.some.deep.property
}

let currentValue
function handleChange() {
  let previousValue = currentValue
  currentValue = select(store.getState())

  if (previousValue !== currentValue) {
    console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
  }
}

let unsubscribe = store.subscribe(handleChange)
unsubscribe()
```

### [`replaceReducer(nextReducer)`](https://www.redux.org.cn/docs/api/Store.html#replaceReducer)

替换 store 当前用来计算 state 的 reducer。

这是一个高级 API。只有在你需要实现代码分隔，而且需要立即加载一些 reducer 的时候才可能会用到它。在实现 Redux 热加载机制的时候也可能会用到。