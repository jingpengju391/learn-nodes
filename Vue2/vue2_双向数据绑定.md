# 双向数据绑定
- 双向数据绑定为vue2核心技术并且比较复杂，这里讲述下实现过程及简单源码
- 在创建vue实例的时候vue做了三件事
    1. 属性监听(Observe)
    2. 属性代理(Obagent)
    3. 末班编译(Compile)


- Observe: 为vue date上的属性添加get，set方法( 通过递归调用Object.defineProperty ) 
- 注：此时每个vue实例上的属性被访问或修改都会触发身上的getset方法，此为vue的数据劫持


- Obagent：通过Object.defineProperty来监听直接访问和设置vm上的对象此时去访问或设置vm data 上的对象
- 注：Obagent只需要劫持顶层data上的数据


- Compile：
    1. 考录到循环渲染消耗性能 vue采取文档碎片的方式编译模板 
        注：文档碎片争议比较大 新版非ie文档碎片的性能没问题，考虑到这一点本人建议使用模板字符串拼接的方式，在这里兼容了ie
    2. 获取vue实例根节点(#app),挂在到vue实例上，通过递归的方式将根节点上所有子节点添加到文档碎片中(创建个空的文档碎片够细了吧)
    3. 在递归添加文档碎片的过程中将vue data 上的值替换掉{{}},和v-model的值 
    4. 最后将文档碎片添加到根节点中

此时完成了vue对实例上数据的渲染 

- vue 存在两个类 分别是 收集订阅者(Dep)和发布订阅者(Watcher)
- Dep：存储这所有的订阅者(watcher) 一个临时的target 和 添加wacher/更新调用watcher的方法
- watcher：属性有 vue实例 key 回调函数 和一个更新自己的方法

## 收集所有的watcher

1. 在模板编译的时，在每次dom与vue 实例 data 上数据的响应 都会创建个watcher
2. 在每次创建watcher的时候，watcher指向Dep的target 然后通过触发get方法将watcher添加到sub集合中（ 触发get方法vue采用一种取巧的方式，在每次创建watcher会携带个key,通过reduce万金油的方法去链式访问这个值触发get方法，得到想要的结果在把dep上的target清空 ）
3. 在页面数据修改的时候（ set被触发时 ）调用dep的notify 区循环调用watcher上的update( update 的回调会接受一个newValue，通过更新node节点达到双向绑定的效果 )


```js
class Vue{
    constructor(options){
        this.$data = options.data
        // 属性监听
        Observe(this.$data)
        // 属性代理
        Obagent(this.$data, this)
        // 模版编译
        Compile(options.el,this)
    }
}
// 收集依赖/收集订阅者
class Dep{
    constructor(){
        // 用来存放所有订阅者的信息
        this.subs = []
        console.log(this.subs)
    }
    // 添加所有的订阅者
    addSub(watcher){
        this.subs.push(watcher)
        
        console.log(this.subs)
    }
    // 发布通知的方法
    notify(){
        this.subs.forEach(watcher => watcher.update())
    }
}
// 订阅者的类
class Watcher{
    constructor(vm, key, callback){
        this.vm = vm
        this.key = key
        this.callback = callback
        Dep.target = this
        key.split('.').reduce((newObj,key) => newObj[key],vm)
        Dep.target = null
    }

    update(){
        const value = this.key.split('.').reduce((newObj,key) => newObj[key],this.vm)
        this.callback(value)
    }
}

function Observe(data){
    if(!data || typeof data !== 'object') return
    const dep = new Dep()
    Object.keys(data).forEach(key => {
        let value = data[key]
        Observe(value)
        Object.defineProperty(data,key,{
            configurable:true,
            enumerable:true,
            get(){
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newVal){
                value = newVal
                Observe(value)
                dep.notify()
            }
        })
    })
}

function Obagent(data, _this){
    Object.keys(data).forEach(key => {
        Object.defineProperty(_this,key,{
            configurable:true,
            enumerable:true,
            get(){
                return _this.$data[key]
            },
            set(newValue){
                _this.$data[key] = newValue
            }
        })
    })
}

function Compile(el,vm){
    // 将根结点挂在到vue实例上
    vm.$el = document.querySelector(el)
    // 创建文档碎片
    const fragment = document.createDocumentFragment()
    // 将dom元素添加到文档碎片中
    while(chidNode = vm.$el.firstChild){
        fragment.appendChild(chidNode)
    }

    replace(fragment)

    vm.$el.appendChild(fragment)


    function replace(node){
        // 正则匹配
        const re = /\{\{\s*(\S+)\s*\}\}/

        if(node.nodeType === 3){
            const text = node.textContent
            const execResult = re.exec(text)
            if(execResult){
                // 通过reduce方法获取当前对应的value
                const value = execResult[1].split('.').reduce((newObj,key) => newObj[key],vm)
                node.textContent = text.replace(re,value)
                // 创建watcher的实例
                new Watcher(vm,execResult[1],(newVal) => {
                    node.textContent = text.replace(re,newVal)
                })
            }
            return 
        }
        // 判断当前节点是否是input
        if(node.nodeType === 1 && node.tagName.toUpperCase() === 'INPUT'){
            const attrs = Array.from(node.attributes)
            const findResult = attrs.find(item => item.name === 'v-model')
            if(findResult){
                const expStr = findResult.value
                const value = expStr.split('.').reduce((newObj,key) => newObj[key], vm)
                node.value = value
                // 创建watcher的实例
                new Watcher(vm,expStr,(newVal) => {
                    node.value = newVal
                })
                node.addEventListener('input',(e) => {
                    const newVal = e.target.value
                    const keyArr = expStr.split('.')
                    const obj = keyArr.slice(0,keyArr.length -1).reduce((newObj,key) => newObj[key],vm)
                    obj[keyArr[keyArr.length - 1]] = newVal
                })
            }
        }
        // 证明不是文本节点，需要递归处理
        node.childNodes.forEach(child => replace(child))
    }
}
```