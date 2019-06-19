## 1. 单个组件的性能优化
在之前做的Todo应用中其实是用性能问题的

```js
const todoList = props => {
    const { todos, onToggleTodo, onRemoveTodo } = props
    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        onToggleTodo={() => onToggleTodo(todo.id)}
                        onRemoveTodo={() => onRemoveTodo(todo.id)}
                    />
                ))}
            </ul>
        </div>
    )
}

// ...
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(todoList)


// TodoItem
const TodoItem = (props) => {
    const { text, completed, onToggleTodo, onRemoveTodo } = props
    const checked = completed ? 'checked' : ''
    return (
        <li>
            <input type="checkbox" onClick={onToggleTodo} checked={checked} readOnly />
            <span>{text}</span>
            <button onClick={onRemoveTodo}>删除</button>
        </li>
    )
}
```

我们发现我们的TodoItem是一个无状态组件

假设我们列表有一千条数据，只有一条数据发生了变化，但是整个TodoList都被重新渲染了一遍

因为TodoItem是一个无状态函
数，所以使用的是React默认的shouldComponentUpdate函数实现，也就是永
远返回true的实现。

所以整个TodoList都被重新渲染了一遍

所以我们可以改写TodoItem
```js
class TodoItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        // completed或者text发生变化时，才重新渲染
        return (nextProps.completed !== this.props.completed) || 
        (nextProps.text !== this.props.text)
    }
    render() {
        const { text, completed, onToggleTodo, onRemoveTodo } = this.props
        const checked = completed ? 'checked' : ''
        return (
            <li>
                <input type="checkbox" onClick={onToggleTodo} checked={checked} readOnly />
                <span>{text}</span>
                <button onClick={onRemoveTodo}>删除</button>
            </li>
        )
    }
}
```

## 2. 多个组件的性能优化

这里要介绍到React的原理了。

首先在装载阶段，没有太多优化的过程，所有的React的组件都要经历一遍装载

至于卸载阶段，只有一个生命周期函数componentWillUnmount，这个函
数做的事情只是清理componentDidMount添加的事件处理监听等收尾工作，
做的事情比装载过程要少很多，所以也没有什么可优化的空间

关键在更新阶段

### 2.1 React的调和（Reconciliation）过程
在装载阶段的时候，React通过render()函数在内存中产生了一个树形结构，树上每一个节点就代表React组件或者原生DOM元素，这个树形结构就是所谓的虚拟DOM(Virtual DOM)

用户操作触发了页面更新，React重新生成虚拟DOM，然后比较两个虚拟DOM的不同，来修改真实的DOM树

这个找不同的过程就叫做调和，React采用了巧妙的diffing算法进行实现

#### 1. 节点类型不同的情况

如果根节点类型不相同，就不用费心考虑了，就直接销毁旧树，重新建树。

原有的树会经历componentWillUnmount的生命周期，取而代之的组件componentWillMount、render和componentDidMount方法依次被调用

举个例子
```js
// 原有的结构
<div>
    <Todos />
</div>

// 更新
<span>
    <Todos />
</span>
```

我们只是将根节点div改成了span，但是这个算法会废掉div节点以及所有子节点，一切推倒重来

很明显，这是一个巨大的浪费，顶层的元素实际上不做什么实质的功能，但是仅仅因为类
型不同就把本可以重用的Todos组件卸载掉，然后重新再把这个组件装载一
遍。

所以作为开发者一定要尽量避免这种情况

#### 2. 节点类型相同的情况

如果两个树形结构的根节点类型相同，React就认为原来的根节点只需
要更新过程，不会将其卸载，也不会引发根节点的重新装载

- 对于DOM元素类型，React会保留节点对应的DOM元素，只对树形结构
根节点上的属性和内容做一下比对，然后只更新修改的部分。
- 对于React组件类型，React能做的只是根据新节点的props去更
新原来根节点的组件实例，引发这个组件实例的更新过程（调用生命周期函数）

这里考虑一个情况
```js
// 原状态
<ul>
    <TodoItem text="First" completed={false}>  
    <TodoItem text="Second" completed={false}>
</ul>

// 更新
<ul>
    <TodoItem text="Zero" completed={false}>
    <TodoItem text="First" completed={false}>  
    <TodoItem text="Second" completed={false}>
</ul>
```

按道理说只需要渲染 text=`Zero` 的组件

但React没有那么聪明，它不会仔细判断两个组件是否相同，只是单纯的按位置比较

于是三个组件都被重新渲染了一遍

React就出了一个key的功能，在渲染列表的时候，指定组件的唯一key值（必须稳定不变）

React就会根据key去比较组件，避免重复渲染