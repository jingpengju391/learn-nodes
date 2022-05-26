# react-router-dom

### 专用于web

### BrowserRouter HashRouter 区别

```
1. 底层原理不一样：BrowserRouter 使用的是底层h5的history api，不支持ie9以下版本。HashRouter使用的url的哈希值
2. path表象形式不一样：BrowserRouter中途没有#，HashRouter有#
3. 刷新后对路由state的影响：BrowserRouter刷新后没有任何影响，因为state保存在history中，HashRouter会导致state数据丢失
4. 注：HashRouter可以用于解决一些路径错误相关问题
```



### Swich

```
大多数情况下，我们写的路由都会是多个，这样就涉及到了一个效率问题。
react-router-dom 在普通情况下会将所有的路由都循环一遍，找出符合匹配规则的路由渲染到页面，也就是只要匹配成果就会渲染，但很多情况我们的路由都是一一对应的关系，所以我们需要单一匹配，swich就给为我们做这件事的。
匹配成功就不在继续查询是否有符合匹配规则的路由。
```

### react 在找不到路由的情况下

```
如果你请求了一个不存在的资源，就会把pubilc下的index.html返回，index.html是个兜底
```

### 针对路由加前缀后相对资源丢失

```
1. 写绝对路径
2. 路由改成hash值
```

