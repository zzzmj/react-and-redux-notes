import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions'

class Filter extends Component {
    render() {
        const {onClickAll, onClickCompleted, onClickUnCompleted} = this.props
        return (
            <div>
                <button onClick={onClickAll} >全部</button>
                <button onClick={onClickCompleted} >已完成</button>
                <button onClick={onClickUnCompleted} >未完成</button>
            </div>
        )
    }
}

const mapDispathchToProps = (dispatch) => {
    return {
        onClickAll: () => {
            dispatch(actions.setFilterAll())
        },
        onClickCompleted: () => {
            dispatch(actions.setFilterCompleted())
        },
        onClickUnCompleted: () => {
            dispatch(actions.setFilterUncompleted())
        }
    }
}

export default connect(null, mapDispathchToProps)(Filter)
