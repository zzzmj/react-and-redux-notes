import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class AddTodo extends Component {
    refInput = node => {
        this.input = node
    }

    onInputChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    onSubmit = ev => {
        // 关闭自动刷新
        ev.preventDefault()
        const inputValue = this.state.value
        if (!inputValue) {
            return 
        }

        this.props.onAddTodo(inputValue)
        this.setState({value: ''})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onInputChange} />
                    <button type="submit">添加事项</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTodo: text => {
            dispatch(Actions.addTodo(text))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AddTodo)
