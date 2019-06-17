import React from 'react'
import ReactDOM from 'react-dom'
import ControlPanel from './views/ControlPanel'
import store from './Store'
import Provider from './Provider'

ReactDOM.render(
    <Provider store={store}>
        <ControlPanel />
    </Provider>,
    document.getElementById('root')
)
