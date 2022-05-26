# refs

## 1. 何时使用 Refs
- 管理焦点，文本选择或媒体播放。
- 触发强制动画
- 集成第三方 DOM 库


    注： 勿过度使用 Refs

## 2. refs的三种使用方式

- 即将被废弃的 不推荐

```react
class Demo extends React.Component{
    render(){
        return (
        <div ref="hello">hello</div>
        )
    }

    getRefs = () => {
    console.log(this.$refs.hello)
    }
}
```

- 回调式refs 推荐
  
```react
class Demo extends React.Component{
    render(){
        return (
        <div ref={currentRef => this.hello = currentRef}>hello</div>
        )
    }

    getRefs = () => {
    console.log(this.hello)
    }
}
```
    注意：如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

- refapi 推荐
```react
class Demo extends React.Component{
    hello = React.createRef()
    render(){
        return (
            <div ref={this.hello}>hello</div>
        )
    }

    getRefs = () => {
        console.log(this.hello)
    }
}
```