## 1. 前言
在上面两节中，引入了`容器组件，傻瓜组件`和`Context`组件来优化Redux

有一个这样的库已经帮我们做好了这些工作，也就是`react-redux`

react-redux提供了两个最主要的api
- connect: 连接容器组件和傻瓜组件
- Provider: 提供包含store的context

## 2. connect
connect用法
```js
// 完整写法
const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)
export default CounterContainer;
```

connect的作用就是根据我们传入的UI组件和业务逻辑，自动生成容器组件

它具体做了什么工作呢？
1. 把Store上的状态，转化为props传给傻瓜组件
2. 将内层傻瓜组件的用户动作转化为派发给容器组件的动作

换句话说这两个工作一个就是傻瓜组件的输入，一个就是傻瓜组件的输出

### 2.1 mapStateToProps
mapStateToProps是connect函数的第一个参数

看名字就知道意思是建立state和props的映射，也就是把Store上的状态，转化为props传给傻瓜组件

例子
```js
// 第二个是可选参数，这个参数代表着容器组件的props
function mapStateToProps(state, ownProps) {
    const { caption } = ownProps
    return {
        value: state[caption]
    }
}
```


### 2.2 mapDispatchToProps
mapDispatchToProps是connect函数的第二个参数

建立dispathch和props的映射，将内层傻瓜组件的用户动作转化为派发给容器组件的动作

```js
// 第二个是可选参数，这个参数代表着容器组件的props
function mapDispatchToProps(dispatch, ownProps) {
    const {caption} = ownProps
    return {
        onIncrement: () => {
            dispatch(Actions.increment(caption))
        },
        onDecrement: () => {
            dispatch(Actions.decrement(caption))
        }
    }
}
```

### 2.3 总结

connect函数还是有一些复杂的，脑海中要时刻存在容器组件和傻瓜组件的两个概念

connect函数帮我们做的事情就是创建容器组件，然后连接容器组件和傻瓜组件

**记住导出的是connect帮我们创造的容器组件**

### 3. Provider

Provider的用法比较简单，也就是提供包含store的context。

之前也实现过一个完整的Provider，只是没那么严谨

用法没有差别


### 4. 流程图

最后通过react-redux的流程图，再复习一遍流程

![](http://ww1.sinaimg.cn/large/006PpBLoly1g44ia54cfkj30lz0i276x.jpg)