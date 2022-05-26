# setState

### React 状态的更新是异步的

```js
setState(updater, [callback])  // 函数式
```

- updater 返回 stateChange的函数
- updater接受两个参数 state和props
- callback 为可选的回调函数，在状态更新和页面更新后回调

```js
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

```react
setState(stateChange, [callback]) // 对象式
```

- `stateChange` 会将传入的对象浅层合并到新的 state 中，这种形式的 `setState()` 也是异步的，并且在同一周期内会对多个 `setState` 进行批处理。例如，如果在同一周期内多次设置商品数量增加，则相当于

```js
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

- callback 为可选的回调函数，在状态更新和页面更新后回调

```
注：不要直接修改state数据，要产生新的数据，还是要改变堆里的引用地址
```

## 总结

```
- 对象式的setState是函数式的setState的语法糖
- 原则
	1. 如果新状态不依赖于原状态使用对象式
	2. 如果在状态更新后立即获取更新数据那个要在callback中获取
```

