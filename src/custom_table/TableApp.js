
import React from 'react'
import TablePanel from './TablePanel'
import { cellPairs, cellPairApp } from '../reducer/reducers'
import { createStore, combineReducers } from 'redux'
import { addCellPair } from '../action/actions'
let CellId = 0;
export let store = createStore(cellPairApp)
export default class TableApp extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => {
                    store.dispatch({
                        type: "ADD_CELLPAIR",
                        id: CellId++
                    })
                }}>
                    add
                </button>
                {console.log("cell is ", this.props.cells)}
                <table className="table table-bordered">
                    <thead>
                        {this.props.cells.map(cell => {
                            return cell.cellPair
                        })}
                    </thead>
                </table>
            </div>
        )
    }
}