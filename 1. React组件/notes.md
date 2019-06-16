## 1. 前言
这一章是介绍构建高质量组件的原则和方法

- 划分组件边界的原则。
- React组件的数据种类。
- React组件的生命周期。


## 2. React组件的数据
React组件的数据只分为两种：`prop`和`state`

无论`prop`或者`state`发生改变，都可能引发组件的重新渲染

使用这两者的原则是：
对外使用`prop`，对内使用`state`


## 2.1 React中的prop

在React中, prop是从外部传递给组件的数据。

每个React组件都是独立存在的模块，组件之外都是外部世界，外部世界就是通过prop跟组件进行对话的

```js
class ControlPanel extends Component {
    render() {    
        return (      
            <div>        
                <Counter caption="First" initValue={0} />       
                <Counter caption="Second" initValue={10} />       <Counter caption="Third" initValue={20} />      
            </div>    
        );  
    }
}


class Counter extends Component {
    constructor(props) {
        // 如果要用this，必须调用super()
        super(props)
        this.state = {
            count: props.initValue || 0
        }
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this)
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this)    
    }

    onClickIncrementButton() {
        var count = this.state.count + 1
        this.setState({ 
            count
        })
    }

    onClickDecrementButton() {
        var count = this.state.count - 1
        this.setState({
            count
        })
    }

    render() {
        const { caption } = this.props
        return (
            <div>
                <button style={style} onClick={this.onClickIncrementButton} >+</button>
                <button style={style} onClick={this.onClickDecrementButton} >-</button>
                <span>{ caption } count: {this.state.count}</span>
            </div>
        )
    }
}
```

ControlPanel组件给Counter组件传递了两个prop属性`caption`和`initValue`


**propTypes**

因为prop是组件的对外接口，以防传进来的东西混杂，应该制定良好的接口规范

通过propTypes即可实现约束我们的prop
```js
Counter.propTypes = {
    caption: PropTypes.string.isRequired, // caption必须是字符串并且必须要填
    initValue: PropTypes.number // initValue必须是数字，可不填
}
```

## 2.2 React中的state

state代表组件的内部状态，是对内的。

React不能修改传入的prop，记录自身数据变化就需要用到state

上面的例子也说明了

要更新state必须使用setState方法，不能直接修改


## 2.3 React组件的生命周期

React的生命周期分为三个阶段

1. 装载过程（Mount），组件第一次在DOM树中渲染的过程
2. 更新过程（Update），组件重新被渲染的过程
3. 卸载过程（Unmount），组件从DOM中删除


如图所示
![react生命周期zh](/assets/react生命周期zh.png)

讲解

### 2.3.1 constructor()

constructor()也就是ES6中的构造函数。

注意：**并不是每个组件都需要定义构造函数，无状态组件就不需要定义构造函数**

一个React组件需要定义构造函数的原因一般有几点：
1. 初始化state
2. 绑定成员函数的this环境


### 2.3.2 static getDerivedStateFromProps()

尽量不要去动它


### 2.3.3 render()

    render函数无疑是React组件中最重要的函数，一个React组件可以忽略
其他所有函数都不实现，但是一定要实现render函数，因为所有React组件的
父类React.Component类对除render之外的生命周期函数都有默认实现.

render()函数并不会做实际上的渲染动作，它只是返回JSX描述的结构，最终由React完成渲染。

需要注意，render函数应该是一个纯函数，完全根据this.state和this.props
来决定返回的结果，而且不要产生任何副作用


### 2.3.4 componentDidMount()

componentDidMount在render函数之后被调用

组件渲染完成后调用。

### 2.3.5 shouldComponentUpdate()

```shouldComponentUpdate(nextProps, nextState)```

render和shouldComponentUpdate函数，也是React生命周期函数中唯二两
个要求有返回结果的函数

render函数的返回结果将用于构造DOM对象，而
shouldComponent-Update函数返回一个布尔值，告诉React库这个组件在这次
更新过程中是否要继续。