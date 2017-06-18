import React from 'react'
import { connect } from 'react-redux'
import { addCellPair } from '../action/actions'

let AddCellPair = ({ dispatch }) => {
    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    dispatch(addCellPair())
                }}
            >
                <button type='submit'>addCellPair</button>
            </form>
        </div>
    )
}
AddCellPair = connect()(AddCellPair)
export default AddCellPair
