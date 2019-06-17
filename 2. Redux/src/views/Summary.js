import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Summary extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = this.getOwnState()
        this.onChange = this.onChange.bind(this)
        this.getOwnState = this.getOwnState.bind(this)
    }

    componentDidMount() {
        this.context.store.subscribe(this.onChange)
    }

    componentWillUnmount() {
        this.context.store.unsubscribe(this.onChange)
    }

    onChange() {
        this.setState(this.getOwnState())
    }

    getOwnState() {
        const state = this.context.store.getState()
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

Summary.contextTypes = {
    store: PropTypes.object
}

export default Summary
