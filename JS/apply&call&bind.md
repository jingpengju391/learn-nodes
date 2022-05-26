# apply&call&bind

##### apply call bind 它们是一个可以改变函数this指向的方法

```js
// 以call为例
var name = 'window name'
function show_name(){
  console.log(this.name)
}

show_name()  // window name

var person = {
  name: 'person name'
}
show_name.call(person) // person name
```

##### apply call bind 同时可以向函数内部传递参数

```js
// 以call为例
var name = 'window name'
function show_info(age,sex){
  console.log(this.name + ':' + 'age:' + age + 'sex:' + sex)
}
show_info(28,'男')   // window name:age:28sex:男

var person = {
  name: 'person name'
}
show_info.call(person,28,'男')   // person name:age:28sex:男

```

###  三者的区别

- apply和call 都可以主动触发函数调用，bind具有返回值，需要手动触发
- call和bind的传参形式一样，apply是以数组的形式传参

```js
// apply和call 都可以主动触发函数调用，bind需要手动触发
function show_info(age,sex){
  console.log(this.name)
}
var person = {
  name: 'person name'
}
show_info.call(person)   // person name
show_info.bind(person)   // 无效果

const fun = show_info.bind(person)
fun()
```

```js
// call和bind的传参形式一样，apply是以数组的形式传参
function show_info(age,sex){
  console.log(this.name + ':' + 'age:' + age + 'sex:' + sex)
}

var person = {
  name: 'person name'
}
show_info.call(person,28,'男')   // person name:age:28sex:男
const fun = show_info.bind(person,28,'男')
fun()  // person name:age:28sex:男

show_info.apply(person,[28,'男']) // person name:age:28sex:男
```

