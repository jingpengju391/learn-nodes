# Fragment

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```jsx
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

还有一种新的[短语法](https://zh-hans.reactjs.org/docs/fragments.html#short-syntax)可用于声明它们。

### 短语法

你可以使用一种新的，且更简短的语法来声明 Fragments。它看起来像空标签：

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>        
      	<td>Hello</td>
        <td>World</td>
      </>    
    );
  }
}
```

```
注：你可以像使用其他任意元素一样使用 `<> </>`，但它并不支持 key 或属性。React.Fragment 支持key
```

