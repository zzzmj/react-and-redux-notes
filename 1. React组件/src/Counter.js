import React, { Component } from 'react'
import PropTypes from 'prop-types'

const style = {
    margin: '0px 5px'
}

class Counter extends Component {
    constructor(props) {
        // 如果要用this，必须调用super()
        super(props)
        this.state = {
            count: props.initValue || 0
        }
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this)
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this)    
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 避免不必要的渲染
        return (nextProps.caption !== this.props.caption) || 
            (nextState.count !== this.state.count);
    }

    onClickIncrementButton() {
        let count = this.state.count + 1
        this.props.onUpdate(this.state.count, count)
        this.setState({ 
            count
        })
    }

    onClickDecrementButton() {
        let count = this.state.count - 1 || 0
        this.props.onUpdate(this.state.count, count)
        this.setState({
            count
        })
    }

    render() {
        const { caption } = this.props
        return (
            <div>
                <button style={style} onClick={this.onClickIncrementButton} >+</button>
                <button style={style} onClick={this.onClickDecrementButton} >-</button>
                <span>{ caption } count: {this.state.count}</span>
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
