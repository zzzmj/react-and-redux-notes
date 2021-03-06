import React, { Component } from 'react'
import Counter from './Counter'
import Summary from './Summary'

const style = {
    magrin: '20px'
}

class CounterPanel extends Component {
    render() {
        return (
            <div style={style}>
                <Counter caption="First"  test="123"/>
                <Counter caption="Second" />
                <Counter caption="Third"  />
                <hr />
                <Summary />
            </div>
        )
    }
}

export default CounterPanel
