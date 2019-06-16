import React, { Component } from 'react'
import Counter from './Counter'

const style = {
    magrin: '20px'
}

class App extends Component {
    constructor(props) {
        super(props)
        this.initValues = [0, 10, 20]
        let sum = 0
        for (let i = 0; i < this.initValues.length; i++) {
            sum += this.initValues[i]
        }
        this.state = { sum }
    }

    onCounterUpdate = (preCounter, counter) => {
        let sum = this.state.sum
        if (preCounter > counter) {
            sum--
        } else if (preCounter < counter) {
            sum++
        }
        this.setState({
            sum
        })
    }

    render() {
        return (
            <div style={style}>
                <Counter onUpdate={this.onCounterUpdate} caption="First" initValue={this.initValues[0]} />
                <Counter onUpdate={this.onCounterUpdate} caption="Second" initValue={this.initValues[1]} />
                <Counter onUpdate={this.onCounterUpdate} caption="Third" initValue={this.initValues[2]} />
                <hr />
                <p>total: {this.state.sum}</p>
            </div>
        )
    }
}

export default App
