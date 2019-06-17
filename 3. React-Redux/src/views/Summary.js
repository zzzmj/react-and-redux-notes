import React from 'react'
import { connect } from 'react-redux';

const Summary = (props) => {
    return (
        <div>
            <p>total: { props.total }</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    let sum = 0
    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            sum += state[key];
        }
    }
    return {
        total: sum
    }
}

export default connect(mapStateToProps)(Summary)
