# RenderProps

### 向组件内部动态传入带有内容的标签，如vue的插槽（slot）功能

- #### Children Porps

- #### Render Props

### Children Porps

```jsx
<A>
  <B>xxxx</B>
</A>
- 把 xxxx 展示到 B 组件中是做不到的
- 可以通过 this.props.children 拿到
```

### Render Props

```jsx
<A render = {(data) => <C data={data}>}></C>
</A>
- 通过 this.props.render() 获取 A 组件中的数据
```

