function createStore(reducer, initState) {
    let state = initState
    let listeners = []

    function subscribe(listener) {
        listeners.push(listener)
    }

    function dispatch(action) {
        // 按照 reducer 修改 state
        state = reducer(state, action)
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }
    }

    function getState() {
        return state
    }

    return {
        subscribe,
        dispatch,
        getState,
    }
}

export default createStore