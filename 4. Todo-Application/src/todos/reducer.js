import * as ActionTypes from './actionTypes'

const reducer = (state=[], action) => {
    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return [...state, {
                id: action.id,
                text: action.text,
                completed: action.completed
            }]
        case ActionTypes.TOGGLE_TODO:
            // 将指定 id 的 todo状态改变
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { 
                        ...todo, 
                        completed: !todo.completed
                    }
                } else {
                    return todo
                }
            })
        case ActionTypes.REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        default:
            return state;
    }
}

export default reducer
