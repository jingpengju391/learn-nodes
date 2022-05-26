# 组件通信

### 利用 pubsubjs 库 [详情](https://www.npmjs.com/package/pubsubjs) 关于pubsubjs

### 订阅组件
```react
import React,{Component} from 'pubsub-js'
import PubSub from 'pubsub-js'

class fb extends Component{
    componentDidMount(){
        // pubsub 为了在组件销毁或适当的时机取消订阅
        this.pubsub = PubSub.subscribe('PubSub-Name',(PubSubName, data) => {
            console.log('接受的数据',data)
        })
    }
    componentWillUnmount(){
        PubSub.unsubscribe(this.pubsub,() => {
            <!-- 接下来要做的事情 -->
        })
    }
    render(){
        return(
            <div onClick={sendInfo}></div>
        )
    }
}
```

### 发布消息组件

```react
import React,{Component} from 'pubsub-js'
import PubSub from 'pubsub-js'

class fb extends Component{
    sendInfo = () => {
        PubSub.publish('PubSub-Name', '发布数据')
    }
    render(){
        return(
            <div onClick={sendInfo}></div>
        )
    }
}
```