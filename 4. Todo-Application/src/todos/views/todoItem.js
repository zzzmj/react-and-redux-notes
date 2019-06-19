import React from 'react'

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

export default TodoItem
