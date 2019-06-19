import * as actionTypes from './actionTypes'

const reducer = (state = actionTypes.ALL, action) => {
    return action.type
}

export default reducer