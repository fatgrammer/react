import React from 'react'
import { createStore } from 'redux'

class BigButton extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.value}</h1>
                <button onClick={this.props.onIncrement}>+</button>
                <button onClick={this.props.onDecrement}>-</button>
                <button onClick={this.props.onPop}>pop</button>
            </div>
        )
    }
}
export default BigButton