# Loader

### loader 的执行顺序

- 分类：pre 前置loader、normal 普通loader、inline 内敛loader、post 后置loader
- 执行顺序： pre > normal > inline > post ( 相同优先级的loader 执行顺序为：从右到左，从上到下 )

#### 例如

```json
// 执行顺序： laoder3 > laoder2 > laoder1
module: {
	rules:[
		{
      tese: /\.js$/,
    	laoder: "laoder1"
    },
    {
      tese: /\.js$/,
    	laoder: "laoder2"
    },
    {
      tese: /\.js$/,
    	laoder: "laoder3"
    }
	]
}
```

```json
// 执行顺序： laoder1 > laoder2 > laoder3
module: {
	rules:[
		{
      enforce: "pre",
      tese: /\.js$/,
    	laoder: "laoder1"
    },
    {
      tese: /\.js$/,
    	laoder: "laoder2"
    },
    {
      enforce: "post",
      tese: /\.js$/,
    	laoder: "laoder3"
    }
	]
}
```

#### 使用loader的方式

- 配置方式： 在webpack.config.js 文件中指定loader。（ pre、normal、 post ）laoder。
- 内联loader：在每个 import 语句中显示指定的loader。

#### 内联loader使用方式( inline loader )

```js
import Styles from 'style-loader!css-loader?modeules!./styles.css'

使用  style-loader 和 css-loader 处理 styles.css 文件
通过 " ! " 将资源中的loader分开 

// inline loader 可以通过添加不同的前缀，跳过其他类型 loader

// " ! " 跳过 normal loader
import Styles from '!style-loader!css-loader?modeules!./styles.css'

// " -! " 跳过 pre / normal loader
import Styles from '-!style-loader!css-loader?modeules!./styles.css'

// " !! " 跳过 pre / normal / post loader
import Styles from '!!style-loader!css-loader?modeules!./styles.css'
```

#### 开发 loader

#### loader 参数

- content 源文件的内容
- Map  SourceMap 数据
- meta 数据，可以是任何内容

```js
// 最简单的loader
module.exports = function loader1(content){
  console.log('hello loader')
  return content
}

// 他接收要处理的源码作为参数，输出转换后的js代码
```

#### 同步loader

```js
module.exports = function (content, map, meta){
	return content
}
```

```js
module.exports = function (content, map, meta)){
  // this.callback 方法更加灵活因为它允许传递多个参数，不仅仅是 content。
  // 第一个参数是 err 错误信息
  this.callback(null, content, map, meta))
	// 传递map 让 source-map 不中断
  // 传递meta 让下一个loader接受到其他的参数 
  return // 当前调用callback函数时总是返回 undefined
}
```

#### 异步loader

```js
module.export = function (content, map, meta){
  const callback = this.async()
  
  setTimeout(() => {
    callback(null, content, map, meta)
  },1000)
}

// 由于同步计算过于 耗时， 在 Node.js 这样的单线程环境下进行此操作并不是好的方案，建议尽可能的使你的loader异步化。如果计算量小，同步loader 也是可以的。
```

#### Raw Loader

```js
// Raw Loader 可以接受 buffer 数据， 默认情况下文件会被转换为 UTF-8的字符串，然后传给loader。通过设置 raw = true，loader可以接受原始的 buffer

module.exports = function (content){
  // centent 为一个buffer数据
  return centent
}

module.export.raw = true
```

#### Pitching Loader

```js
module.exports = function (content){
  return content
}

module.exports.pitch = function(remainingRequest, preedingRequest, data){
  console.log("do somethings")
}


// webpack 会现充做到有执行 loader链接汇总的每个老的人伤的pitch方法（  如果有 ），然后在从右到左直行laoder链接中的每个loader上的普通loader 方法
```

#### clean-log-loader

```js
module.exports = function cleanLogLoader(content){
  return content.replace(/console.log\(.*\);?/g
}

```

#### banner-loader

```js
// 添加作者 loader
const schema = require("./schema.json")

module.export = function (content){
  // 获取loader 的 options，同事对options内容进行校验
  // schema 是 options 的校验规则（ 符合JSON schema 规则 ）
  
  const options = this.geyOptions(schema)
  
  const prefix = `
  	/**
  	* Author: ${options.author}
  	*/
  `
  
  return `${prefix} \n ${content}`
}
```





















