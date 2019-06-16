import React, { Component } from 'react'
import Store from '../Store';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = this.getOwnState()
        this.onChange = this.onChange.bind(this)
        this.getOwnState = this.getOwnState.bind(this)
    }

    componentDidMount() {
        Store.subscribe(this.onChange)
    }

    componentWillUnmount() {
        Store.unsubscribe(this.onChange)
    }

    onChange() {
        this.setState(this.getOwnState())
    }

    getOwnState() {
        const state = Store.getState()
        let sum = 0
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                sum += state[key];
            }
        }
        return {
            sum
        }
    }

    render() {
        return (
            <div>
                <p>total: { this.state.sum }</p>
            </div>
        )
    }
}

export default App
