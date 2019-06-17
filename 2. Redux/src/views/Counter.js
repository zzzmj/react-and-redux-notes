import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Actions from '../Actions'

const style = {
    margin: '0px 5px'
}

const Counter = (props) => {
    const { caption, onClickDecrementButton, onClickIncrementButton, value } = props
    return (
        <div>
            <button style={style} onClick={onClickIncrementButton} >+</button>
            <button style={style} onClick={onClickDecrementButton} >-</button>
            <span>{caption} count: {value}</span>
        </div>
    )
}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    onClickDecrementButton: PropTypes.func,
    onClickIncrementButton: PropTypes.func,
    value: PropTypes.number
}

class CounterContainer extends Component {
    constructor(props, context) {
        // 如果要用this，必须调用super()
        super(props, context)
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
        this.context.store.subscribe(this.onChange)
    }

    componentWillUnmount() {
        // 组件删除后，注销监听
        this.context.store.unsubscribe(this.onChange)
    }

    getOwnState() {
        // 修改成使用context获取
        return {
            value: this.context.store.getState()[this.props.caption]
        }
    }

    onChange() {
        const newState = this.getOwnState()
        this.setState(newState)
    }

    onClickIncrementButton() {
        this.context.store.dispatch(Actions.increment(this.props.caption))
    }

    onClickDecrementButton() {
        this.context.store.dispatch(Actions.decrement(this.props.caption))
    }

    render() {
        return (
            <Counter caption={this.props.caption}
                onClickDecrementButton={this.onClickDecrementButton} 
                onClickIncrementButton={this.onClickIncrementButton}
                value={this.state.value} />
        )
    }
}

CounterContainer.contextTypes = {
    store: PropTypes.object
}

CounterContainer.propTypes = {
    caption: PropTypes.string.isRequired,
    initValue: PropTypes.number,
    onUpdate: PropTypes.func
}

export default CounterContainer
