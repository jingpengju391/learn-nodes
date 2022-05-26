# props

#### 参数的传递

```react
class Demo extends React.Component{
    const {name,age} = this.props

    render(){
        return (
            <div>
                <span>姓名：{name}</span>
                <span>年龄：{age}</span>
            </div>
        )
    }
}
const p = {
    name: 'zs',
    age: 30
}

ReactDom.render(<Demo {...p} />,document.getElementById('root'))
```

#### 参数类型校验及默认值

```react
class Demo extends React.Component{
    const {name,age} = this.props

    static propTypes = {
        name: PropTypes.string.isRequired,  限制name必传
        age: PropTypes.number
    }

    static defaultProps = {
        age: 18
    }

    render(){
        return (
            <div>
                <span>姓名：{name}</span>
                <span>年龄：{age}</span>
            </div>
        )
    }
}
const p = {
    name: 'zs',
    age: 30
}

ReactDom.render(<Demo {...p} />,document.getElementById('root'))
```
