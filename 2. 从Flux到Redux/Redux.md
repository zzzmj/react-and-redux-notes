## 1. Redux
Redux 的工作流程图
![](http://ww1.sinaimg.cn/large/006PpBLoly1g4328g1vdpj31bw0ksgp9.jpg)

## 2. Redux基本原则
Redux三个基本原则
- 单一数据源
- 保持状态只读
- 数据改变只能通过纯函数完成

## 2.1 单一数据源
单一数据源的意思是应用的数据状态只存储在一个唯一的Store中

## 2.2 保持状态只读
保持状态只读，意思就是不要去修改状态，要修改Store的状态，只能通过派发一个action对象完成

思考：驱动用户界面更改的是状态，状态只读，那怎么能引起用户界面的改变呢？

答：当然要改，只是我们不去修改状态值，而是创建一个新的状态对象给Redux，由Redux完成新状态的组装

## 2.3 数据改变只能通过纯函数
这里说的纯函数是Reducer

`reducer(state, action)`

第一个参数state是当前的状态
第二个参数action是接收到的action对象，而reducer函数要做的事情，就是根据state和action的值产生一个新的对象返回，注意reducer必须是纯函数，也就是说函数的返回结果必须完全由参数state和action决定，而且不产生任何副作用，也不能修改参数state和action对象。


## 3. Redux使用教程

例子在src目录下，与上节相同的例子加减组件，用Redux改写。

[通过三张图了解Redux中的重要概念](https://www.cnblogs.com/wilber2013/p/5403350.html)
先用因为react-redux帮我们省去了很多代码，不利于理解，所以先从redux开始

给出概念图
![](http://ww1.sinaimg.cn/large/006PpBLoly1g425barnodj30lr0dqta5.jpg))

### 3.1 Action
Action是一个对象，用来代表所有会引起状态（state）变化的行为

action.js如下所示。
```js
// ActionTypes.js
export const INCREMENT = 'increment'

export const DECREMENT = 'decrement'

// Action.js
import * as ActionTypes from './ActionTypes'

export const increment = (counterCaption) => {
    return {
        type: ActionTypes.INCREMENT,
        counterCaption: counterCaption
    }
}

export const decrement = (counterCaption) => {
    return {
        type: ActionTypes.DECREMENT,
        counterCaption: counterCaption
    }
}
```


### 3.2 Store

Store是Redux中数据的统一存储，维护着state的所有内容

```js
import { createStore } from 'redux'
import reducer from './Reducer.js'

const initValue = {
    'First': 0,
    'Second': 10,
    'Third': 20
}

const store = createStore(reducer, initValue)

export default store
```

### 3.3 Reducer
Reducer决定着如何更新state

``(previousState, action) => newState```

该函数接收两个参数，一个旧的状态previousState和一个Action对象
然后返回一个新的状态newState，去重新渲染View


### 3.4 View

1. 初始化状态
在counter组件中，不在由自己决定状态，而是去store中获取状态
```js
class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = this.getOwnState()
        //...
    }

    getOwnState() {
        const { caption } = this.props
        return {
            value: store.getState()[caption]
        }
    }
}
```

2. 监听状态是否发生改变
肯定要监听组件的状态是否更新, 这里用到了发布订阅模式

```js
componentDidMount() {
   // 通过store.subscribe()监听组件变化，只要组件的状态变化，就会调用onChange方法
   store.subscribe(this.onChange)
}

componentWillUnmount() {
   // 组件删除后，注销监听
   store.unsubscribe(this.onChange)
}

onChange() {
  const newState = this.getOwnState()
  this.setState(newState)
}
```

3. 组件更新的时候，想改变状态唯一的办法是派发action

```js
onClickIncrementButton() {
  const { caption } = this.props
  store.dispatch(Actions.increment(caption))
}

onClickDecrementButton() {
  const { caption } = this.props
  store.dispatch(Actions.decrement(caption))
}
```

大功告成。 看似复杂了很多，增加了很多约束，其实对开发项目有好处，利于提高软件质量