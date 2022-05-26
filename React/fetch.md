# 超文本传输协议
```
提到提到客户端与服务端的超文本传输协议大体有四种方式
```
#### 1. 传统的ajax：xhr （不符合关注分离（Separation of Concerns）的原则）

```js
// ajax的基本请求步骤
// 1.创建对象
const xhr = new XMLHttpRequest();
// 2.初始换
xhr.open('Get', 'http....');
// 发送请求
xhr.send();
// 处理响应回调
xhr.onreadystatechange = function(){
 console.log(`xhr`, xhr)
 // 返回状态码
 if(xhr.readyState === 4){
     // 判断响应状态码为2xx
     if(xhr.status >= 200 && xhr.status <= 300){
         // 控制台输出响应体
         console.log(`xhr.response`, xhr.response)
     }else{
         // 输出响应状态码
         console.log(`xhr.status`, xhr.status)
     }
 }
}

// Promise处理ajax请求
const p = new Promise((resolve, reject) => {
 // ajax的基本请求步骤
 // 1.创建对象
 const xhr = new XMLHttpRequest();
 // 2.初始换
 xhr.open('Get', 'http....');
 // 发送请求
 xhr.send();
 // 处理响应回调
 xhr.onreadystatechange = function(){
     console.log(`xhr`, xhr)
     // 返回状态码
     if(xhr.readyState === 4){
         // 判断响应状态码为2xx
         if(xhr.status >= 200 && xhr.status <= 300){
             // 控制台输出响应体
             // console.log(`xhr.response`, xhr.response)
             resolve(xhr.response)
         }else{
             // 输出响应状态码
             // console.log(`xhr.status`, xhr.status)
             reject(xhr.status)
         }
     }
 }
});
// 调用then方法
p.then(value => {
 console.log(value);
},reason => {
 console.warn(reason)
})
```
#### 2. jquery：ajax
```js
$(document).ready(function(){
    $("#searchBtn").click(function(){
        $.ajax({
            type:"GET",
            url:" https://api.passport.xxx.com/checkNickname?username="+mylogin.username+"&token="+mylogin.token+"&nickname="+nickname+"&format=jsonp&cb=?",
            dataType:"json",
            success:function(data){
                if(data.errorCode==0){
                                         $("#nickname").val(mylogin.nickname);                             
                                 }else{
                                         $("#nickname").val("用户");                         
                                 }
            },
            error:function(jqXHR){
                console.log("Error: "+jqXHR.status);
            }
        });
    });
});
```
#### 3. axios
```js
const axios = require('axios');

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```
#### 4. fetch  兼容性有问题老版本浏览器，但是用的前端框架酌情考虑
```js
fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))

等价于

try{
    const result = await fetch(url)
    const data = await result.json()
}catch(error){
    console.log("Oops, error", error)
}
```
- [官方](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
- [博客](https://segmentfault.com/a/1190000003810652)