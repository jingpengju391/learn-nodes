# 沙箱机制

> 沙箱，英文是sandbox，敲程序的应该都听过，或许用过类似理念的只是自己不知道，简单说就是让你的程序运行在一个隔离的环境下，不对外界的其他程序造成影响。沙箱主要是一种安全机制，把一些不信任的代码运行在沙箱之内，不能访问沙箱之外的代码。比如在线编辑器、执行第三方js、vue服务端渲染等，只要是运行不信任的程序，沙箱隔离就会使用到。

> 常见的eval和new Function可以提供一个运行外部代码的环境，但是没有解决访问全局的问题，配合with用法可以稍微限制，先从当前的with提供的查找，但是查找不到还是能从上获取：

```js
function sandbox(code) {

    code= 'with (sandbox) {' + code + '}'

    return new Function('sandbox', code)

}

let str = 'let a = 10;console.log(a)'

sandbox(str)({})
```

> 而es6的proxy则可以解决这个问题，proxy可以设置访问拦截器，于是with再加上proxy几乎完美解决js沙箱机制。当然，还是有机制可以绕过，有大神发现Symbol.unScopables可以不受with的影响，所以要另外处理Symbol.unScopables：

```js
class ProxySandbox{
  constructor(){
    const rawWindow = window
    const fakeWindow = {}
    const proxy = new Proxy(fakeWindow, {
      set(target,prop,value){
        target[prop] = value
        return true
      },
      get(target,prop){
        return target[prop] || fakeWindow[prop]
      }
    })
    this.proxy = proxy
  }
}

const sandbox1 = new ProxySandbox()
const sandbox2 = new ProxySandbox()
window.a = 1
((window) => {
  window.a = 'hello'
  console.log(window.a)
})(sandbox1.proxy)
((window) => {
  window.a = 'world'
  console.log(window.a)
})(sandbox1.proxy)
```

```
上面的例子应用到es6的proxy，目前js沙箱能做到的最好的沙箱机制，适用于多个应用，但是也有兼容性的限制
```

##### 快照沙箱

```js
class snapShotSandbox{
  proxy = window // window 属性
  modifyPropsMap = {} // 记录在window上的修改
  active()
  active(){ // 激活沙箱
    this.windowSnapshot = {} // 拍照
    for(const prop in window){
      if(window.hasOwnProperty(prop)){
        this.windowSnapshot[prop] = window[prop]
      }
    }
    Object.keys(this.modifyPropsMap).forEach(prop => {
      window[prop] = this.modifyPropsMap[prop]
    })
  }
  inactive(){ // 失活沙箱
    for(const prop in window){
      if(window.hasOwnProperty(prop)){
        if(window[prop] !== this.windowSnapshot[prop]){
          this.modifyPropsMap[prop] = window[prop]
          window[prop] = this.windowSnapshot[prop]
        }
      }
    }
  }
}
const sandbox = new snapShotSandbox()
 
((window) => {
  window.a = 1
  window.b = 2
  console.log(window.a, window.b)
  sandbox.inactive()
  console.log(window.a, window.b)
  sandbox.active()
  console.log(window.a, window.b)
})(sandbox.proxy) // sandbox.proxy 就是 window
```

```
缺点：不支持多个子应用
```

