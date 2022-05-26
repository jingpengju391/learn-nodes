# qiankun

### 实现 vue&react 混合开发项目步骤

```
// 创建核心项目 - vue
vue create vue-core
// 创建vue应用 - vue
vue create vue-child
// 创建react应用 - react
npx create-react-app react-child
```

1. in vue-core

```vue
// 在app.vue文件中
<el-menu :router="true" mode="horizontal">
  <el-menu-item index="/">HOME</el-menu-item>
  <el-menu-item index="/vue">VUE应用</el-menu-item>
  <el-menu-item index="/react">React应用</el-menu-item>
</el-menu>

<router-view to="/">HOME</router-view> // 默认的
<div id="vue"></div> // vue项目
<div id="react"></div> // react项目
```

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib...' // 样式
Vue.use(ElementUI)
// 引入qiankun
import { registerMicroApps, start } from 'qiankun'
const apps = [
	{
    name: 'vueapp',
    entry:'//localhost:10000', // 默认加载这个html 解析里面的js 动态执行 子应用必须支持跨域
    container:'#app',
    activeRule:'/vue',
    props:{
      a:1
    }
  },
  {
    name: 'reactapp',
    entry:'//localhost:20000', // 默认加载这个html 解析里面的js 动态执行 子应用必须支持跨域
    container:'#react',
    activeRule:'/react'
  }
]
registerMicroApps(apps)  
const options = {}
start(options) // options 参数api

new Vue({
  router,
  render:h => h(App)
}).$mount('#app')
```

[其他参数](https://qiankun.umijs.org/zh/api#registermicroappsapps-lifecycles) , 关于registerMicroApps生命周期

2. vue-child

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

let instance = null
if(window.__POWERED_BY_QIANKUN__){
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap(props){}
export async function mount(props){
  render(props)
}
export async function unmount(props){
  instance.$destroy()
}

function render(props){
  instance = new Vue({
    router,
    render:h => h(App)
  }).$mount('#app')
}

```

```js
// vue.config.js
module.exports = {
	devServer:{
		port: 10000,
		headers:{
			'Access-Control-allow-Origin':'*'
		}
	},
	configureWebpack:{
		output:{
			library:'vueApp',
      libraryTarget:'umd'
		}
	}
}
```

3. React-child

```js
// 安装重写webpack插件
yarn add react-app-rewired -D
// 修改package.json
script:{
	"start":"react-app-rewired start",
	"build":"react-app-rewired build",
	"test":"react-app-rewired test",
	"eject":"react-app-rewired eject",
}
```

```js
// 创建 config-overrides.js 重写文件
module.exports = {
	webpack:(config) => {
    config.output.library = 'reactApp'
    config.output.libraryTarget = 'umd'
    config.output.publicPath = 'http://localhost:2000/'
    return config
  }
	devServer:(configFunction) => {
    return function(proxy, allowedHost){
      const config = configFunction(proxy, allowedHost)
      config.port = 20000
      config.headers = {
        'Access-Control-allow-Origin':'*'
      }
      return config
    }
  }
}
```

```react
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap(){}
export async function mount(){
  render(props)
}
export async function unmount(){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}

function render(){
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
```

