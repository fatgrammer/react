import React from 'react'
import { createStore } from 'redux'

const BigButton = ({
    value,
    onIncrement,
    onDecrement
}) => (
        <div>
            <h1>{value}</h1>
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
        </div>
    )


export default BigButton