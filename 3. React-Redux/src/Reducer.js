import * as ActionTypes from './ActionTypes'

export default (state, action) => {
    const caption = action.counterCaption

    switch (action.type) {
        case ActionTypes.DECREMENT:
            return {...state, [caption]: state[caption] - 1}
        case ActionTypes.INCREMENT:
            return {...state, [caption]: state[caption] + 1}
        default:
            return state;
    }
}