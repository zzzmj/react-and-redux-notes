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

```