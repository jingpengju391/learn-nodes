# promise

- 终止promise运行
在想要终止的地方初始化的promise实例 return new Promise(() => {})

```js
function getWithCancel(promise, token) {
   Promise.race([promise, new Promise((_, reject) => {
     token.cancel = function() {
       // reject(new Error('cancel'))
       reject(new Promise(() => {}))
     }
   })]).catch((e) => console.log(e))
};

var token = {};
var promise = fetch(xxxxx)
getWithCancel(promise, token)

token.cancel()
```