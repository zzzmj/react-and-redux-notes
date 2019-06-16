import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Actions from '../Actions'
import store from '../Store'

const style = {
    margin: '0px 5px'
}

class Counter extends Component {
    constructor(props) {
        // 如果要用this，必须调用super()
        super(props)
        this.state = this.getOwnState()
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this)
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 避免不必要的渲染
        return (nextProps.caption !== this.props.caption) || 
            (nextState.value !== this.state.value);
    }

    componentDidMount() {
        // 通过store.subscribe()监听组件变化，只要组件的状态变化，就会调用onChange方法
        store.subscribe(this.onChange)
    }

    componentWillUnmount() {
        // 组件删除后，注销监听
        store.unsubscribe(this.onChange)
    }

    getOwnState() {
        const { caption } = this.props
        return {
            value: store.getState()[caption]
        }
    }

    onChange() {
        const newState = this.getOwnState()
        this.setState(newState)
    }

    onClickIncrementButton() {
        const { caption } = this.props
        store.dispatch(Actions.increment(caption))
    }

    onClickDecrementButton() {
        const { caption } = this.props
        store.dispatch(Actions.decrement(caption))
    }

    render() {
        const { caption } = this.props
        return (
            <div>
                <button style={style} onClick={this.onClickIncrementButton} >+</button>
                <button style={style} onClick={this.onClickDecrementButton} >-</button>
                <span>{ caption } count: {this.state.value}</span>
            </div>
        )
    }
}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    initValue: PropTypes.number,
    onUpdate: PropTypes.func
}

export default Counter
