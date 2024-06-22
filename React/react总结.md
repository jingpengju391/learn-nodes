### 一、React

react 是一个网页UI框架,通过组件化的方式解决视图层开发服用的问题,本质上是一个组件化框架

它的核心有三点 组件化 声明式 通用性

组件化的优点在于 视图的拆分/模块的服用 

声明式的优点在于 直观 / 组合

通用性在于一次学习随处编写。比如 RN R360等这使得react的使用范围足够广，无论是web、native 、VR甚至是shell都可以进行开发

但作为一个视图层框架，react的劣势也十分明显。并没有完整的解决方案，在开发大型应用时需要向社区寻找解决方案

### 二、Jsx

Jsx 是js的语法拓展，结构类似于XML。jsx用于声明react的元素，但react并不强制使用jsx，使用了也会通过babel插件编译为react.creatElement,所以jsx更像是react.creatElement的语法糖。react并不想过多的引入js以外的体系，更像通过关注点分离保持组件开发的纯粹性。

模板对比：模板不应该是开发的关注点，因为引入模板指令，模板语法是一种不佳的实现方案

模板字符串对比：结构嵌套多层后 描述复杂，语法提示差

JXON对比：代码提示扩展差被放弃。

### 三、生命周期（ 类组件 函数组件没有生命周期 ）

#### 初始换

1. constructor
2. getDerivedStateFromProps
3. UNSAFE_componentWillMount
4. render
5. componentDidMount

#### 更新阶段

1. UNSAFE_componentWillReceiveProps
1. getDerivedStateFromProps
1. shouldComponentUpdate
1. UNSAFE_componentWillUpdate （ 暂停更新渲染的情况 ）
1. render
1. getSnapshotBeforeUpdate

#### 卸载阶段

1. componentWillUnmount

### 四、类组件和函数组件的区别

#### 共同点

- 类组件和函数组件的实际用途是一样的，无论是高级组件还是异步加载都可以用他们来展示UI，组件本身的基础功能都是一致的
- *组件是react中最小的代码片段，他们会返回react要在页面渲染的react元素，所以无论是在使用方式或呈现效果都是完全一样的

#### 不同点

- 代码实现 -> 独有特性 -> 使用场景

- 类组件属于面向对象编程(oop),有属性有状态有继承。函数组件属于函数编程(fp)，有输入与输出有特定的映射关系，相比于类组件函数组件更简单，容易测试。

- 类组件this具有模糊性

- 类组件是有继承的，函数组件并没有，但是不推荐继承。react的设计思想有个铁律组合优于继承

- 类组件的优化一般考shouldcomponentupdate阻断函数的渲染，函数组件用react.memo 类似于防抖

  this的模糊性、业务逻辑写在生命周期中、没有标准的组件拆分确定定了类组件终将被函数组件所替代

### 五、Hooks

hooks 的限制

1.不要在循环语句或嵌套函数中使用hooks，hooks是基于数组实现的（链表），在循环语句中使用很容易出现取值错位问题

2.在函数组件中使用hooks。 在类组件中难以复用转台逻辑，复杂的组件难以理解，为了解决这些问题所以产生函数组件

### 六 useEffect 和 useLayoutEffect

#### 共同点

使用方式完全一样，都是处理副作用的

#### 不同点

- useEffect 是异步的 useLayoutEffect 是同步的
