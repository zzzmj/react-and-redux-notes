import * as ActionTypes from './actionTypes'

let nextTodoId = 0
export const addTodo = (text) => {
    return {
        type: ActionTypes.ADD_TODO,
        id: nextTodoId++,
        text: text,
        completed: false
    }
}

export const toggleTodo = (id) => {
    return {
        type: ActionTypes.TOGGLE_TODO,
        id: id
    }
}

export const removeTodo = (id) => {
    return {
        type: ActionTypes.REMOVE_TODO,
        id: id
    }
}

