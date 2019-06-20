## 前言
React框架是由数据驱动视图变化的，基于state的管理实现对组件的管理，通过setState方法来修改当前组件的state，以达到视图的变化。

理解setState的关键点
- setState不会立刻改变React组件中state的值；
- setState通过引发一次组件的更新过程来引发重新绘制；
- 多次setState函数调用产生的效果会合并。

## setState不会立刻改变React组件中state的值

```js
increment = () => {
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
}
```
上面那段代码实际上只能给state.count增加1，而并不是增加3

原因就是setState不会立刻改变state值

因此实际上等同于下面这段代码的效果
```js
increment = () => {
    const curCount = this.state.count
    this.setState({count: curCount + 1});
    this.setState({count: curCount + 1});
    this.setState({count: curCount + 1});
}
```

## setState通过引发一次组件的更新过程来引发重新绘制
setState的工作原理是如何的呢？

setState是通过引发一次组件的更新过程来引发重新绘制的

因此会触发更新阶段的生命周期函数

其中关键的是下面这两个生命周期函数
- shouldComponentUpdate
- render

当render函数被调用时，state才得到了更新
（或者shouldComponentUpdate返回false，更新过程被中断）

## 多次setState函数调用产生的效果会合并

例如下面这段代码
```js
updateName = () => {
    this.setState({FirstName: 'Morgan'});
    this.setState({LastName: 'Cheng'});
}
```

连续调用了两次setState，但只会引发一次更新生命周期。

在每次更新过程中，会把积攒的setState结果合并，做一个merge的动作，所以上面的代码相当于这样。
```js
updateName = () => {
    this.setState({FirstName: 'Morgan', LastName: 'Cheng'});
}
```

## 参数传递函数

如果我们给setState方法传递的参数是函数，那结果就会发生很大的改变

```js
add = (state, props) => {
    return {count: state.count + 1}
}

increment = () => {
    this.setState(this.add)
    this.setState(this.add)
}
```
对于多次调用函数式setState的情况，React会保证调用每次increment时，state都已经合并了之前的状态修改结果。

所以使用之后，state.count会增加2

但要注意的是，不能将函数式的setState和传统式的混用，会产生很严重的BUG
