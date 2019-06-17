import React from 'react'
import PropTypes from 'prop-types'

import * as Actions from '../Actions'
import { connect } from 'react-redux';

const style = {
    margin: '0px 5px'
}

const Counter = (props) => {
    const { caption, onDecrement, onIncrement, value } = props
    return (
        <div>
            <button style={style} onClick={onIncrement} >+</button>
            <button style={style} onClick={onDecrement} >-</button>
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

function mapStateToProps(state, ownProps) {
    console.log(ownProps)
    const { caption } = ownProps
    return {
        value: state[caption]
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    const {caption} = ownProps
    return {
        onIncrement: () => {
            dispatch(Actions.increment(caption))
        },
        onDecrement: () => {
            dispatch(Actions.decrement(caption))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
