import React from 'react'
import TodoItem from './todoItem'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import * as FilterTypes from '../../filter/actionTypes'

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

const selectVisibleTodos = (todos, filter) => {
    switch (filter) {
        case FilterTypes.ALL:
            return todos
        case FilterTypes.COMPLETED:
            return todos.filter((todo) => todo.completed)
        case FilterTypes.UNCOMPLETED:
            return todos.filter((todo) => !todo.completed)
        default:
            return todos;
    }
}

const mapStateToProps = state => {
    return {
        todos: selectVisibleTodos(state.todos, state.filter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleTodo: id => {
            dispatch(Actions.toggleTodo(id))
        },
        onRemoveTodo: id => {
            dispatch(Actions.removeTodo(id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(todoList)
