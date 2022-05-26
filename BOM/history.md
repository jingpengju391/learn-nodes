# history

- length
> history.length属性保存着历史记录的URL数量。初始时，该值为1。如果当前窗口先后访问了三个网址，history.length属性等于3 由于IE10+浏览器在初始时返回2，存在兼容性问题，所以该值并不常用

```js
history.length // 初始时，该值为1
history.length // 访问三个网址后，该值为3
```

- 跳转方法
>history对象提供了一系列方法，允许在浏览历史之间移动，包括go()、back()和forward()go()】

　　使用go()方法可以在用户的历史记录中任意跳转。这个方法接收一个参数，表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转(类似于后退按钮)，正数表示向前跳转(类似于前进按钮)

```js
//后退一页
history.go(-1)
//前进一页
history.go(1);
//前进两页
history.go(2);
```

>go()方法无参数时，相当于history.go(0)，可以刷新当前页面
```js
//刷新当前页面
history.go();
//刷新当前页面
history.go(0);
```

>back()方法用于模仿浏览器的后退按钮，相当于history.go(-1)
>forward()方法用于模仿浏览器的前进按钮，相当于history.go(1)

- 增改记录
- replaceState()
- state
- popstate事件
- 往返缓存
- pageshow

- [详情](https://www.cnblogs.com/xiaohuochai/p/6379546.html) 关于pubsubjs