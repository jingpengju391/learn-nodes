# Hooks

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量  
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 常用的hook

- State hook: React.useState()
- Effect hook: React.useEffect()
- Ref hook: React.useRef()

##### State hook

1. State hook让函数状态组件也可以有state状态，并对state进行操作
2. 语法：const [xxx, setXxx] = useState(initValue)
3. useState

- 参数：第一次初始化指定参数在内部做缓存
- 返回值：内部当前的状态和更新状态的函数

4. setXxx

```js
setXxx(count + 1)
setXxx(count => newCount)
```

##### Effect hook

主要用于模拟副作用，模拟类组件中生命周期

- 副作用
  1. 发ajax请求数据捕获
  2. 设置订阅 / 启动定时器
  3. 手动更新真实dom
- 语法：

```jsx
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);
  // 当useEffect的第二个参数为[]时 handlexxx 相当于 componentDidmount 和 componentDidUpdate
  // 当useEffect的第二个参数为[stateValue]时 handlexxx 相当于 componentDidmount 和 监听stateValue变量更新执行操作
  function handlexxx (){} 
  // handleCCc 相当于 componentWillUnmount
  function handleCCc (){}
  useEffect(() => { 
    handlexxx()
    return handleCCc
  }, []); // 如果指定的是空数组，回调函数只会在第一次render后执行
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

##### Ref hook

```jsx
import React, { useRef } from 'react';
function Example() {
  const refDom = useRef();
  function showValue(){
    console.log(refDom.current.innerHTML)
  }
  return (
    <div>
      <p ref="refDom">You clicked {count} times</p>
      <button onClick={showValue}>
        Click me
      </button>
    </div>
  );
}
```

- 可以在函数组件中查找或存储内部标签数据
- 语法：const refDom = useRef();
- 作用：保存标签对象，功能和React.createRef 一样