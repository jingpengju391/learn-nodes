### 使用 npm 的语义版本控制 
- 看文档 [版本说明](http://nodejs.cn/learn/semantic-versioning-using-npm)

### 卸载 npm 软件包
- npm uninstall <package-name>
- npm uninstall -S <package-name>
- npm uninstall -D <package-name>
- 如果使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用。
- 如果程序包是开发依赖项（列出在 package.json 文件的 devDependencies 中），则必须使用 -D 或 --save-dev 标志从文件中移除：
- npm uninstall -g <package-name>
- npm uninstall -g <package-name>

### Node.js 包运行器 npx 
- npx 发布全局软件包，处于路径中可被立即执行
