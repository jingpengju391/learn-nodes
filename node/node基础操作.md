### 运行node脚本
- node name.js

### 退出node程序
- ctrl-C
- process.exit()   所有进程都将被非正常终止
- process.kill(process.pid, 'SIGTERM')  通过句柄
> SIGKILL 是告诉进程立即终止的信号，理想情况下会像 process.exit() 一样。
> SIGTERM 是告诉进程正常终止的信号。 这是从 upstart 或 supervisord 等进程管理器发出的信号。

### 读取环境变量
> process.env.NODE_ENV // "development"
- Node.js 的 process 核心模块提供了 env 属性，该属性承载了在启动进程时设置的所有环境变量。

### 如何使用 Node.js REPL
- 看 node 文档去吧 [REPL](http://nodejs.cn/learn/how-to-use-the-nodejs-repl)

### Node.js 从命令行接收参数
```
node app.js name=joe // 需要解析

node app.js --name=joe // 最好的方法是使用 minimist 库
```

```
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

const args = require('minimist')(process.argv.slice(2))
args['name'] //joe
```
- 第一个参数是 node 命令的完整路径。

- 第二个参数是正被执行的文件的完整路径。

- 所有其他的参数从第三个位置开始。

### node 输出到命令行 console.log
- 可以格式化用语  console.log('我的%s已经%d岁', '猫', 2)
- %s 会格式化变量为字符串
- %d 会格式化变量为数字
- %i 会格式化变量为其整数部分
- %o 会格式化变量为对象

- console.clear() 会清除控制台（其行为可能取决于所使用的控制台）
- console.count() 是一个便利的方法
- console.trace() 打印堆栈踪迹
- console.time()  onsole.timeEnd() 计算耗时
- console.log('\x1b[33m%s\x1b[0m', '你好') 输出颜色  chalk console.log(chalk.yellow('你好'))
- 创建进度条
```
const ProgressBar = require('progress')

const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)
```

### 在 Node.js 中从命令行接收输入 -- readline
```
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`你叫什么名字?`, name => {
  console.log(`你好 ${name}!`)
  readline.close()
})
```

### 使用 exports 从 Node.js 文件中公开功能

- module.exports 和 export 之间区别
> 前者公开了它指向的对象。 后者公开了它指向的对象的属性

```
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

module.exports = car

//在另一个文件中

const car = require('./car')
```
```
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

exports.car = car
```