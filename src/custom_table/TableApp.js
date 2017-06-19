import React from 'react'
import TablePanel from './TablePanel'
import { cellPairs, cellPairApp } from '../reducer/reducers'
import { createStore, combineReducers } from 'redux'
import { addCellPair } from '../action/actions'
export let CellId = 0;
export let store = createStore(cellPairApp)


export const getDispatcher = (level, id) => {
    switch (level) {
        case 'PAIR':
            return ()=>store.dispatch({
                type: 'ADD_CELLPAIR',
                id
            })
        case 'FIRST':
            return ()=>store.dispatch({
                type: 'ADD_SECOND',
                id
            })
        case 'SECOND':
            return ()=>store.dispatch({
                type: 'ADD_THIRD',
                id
            })
        default:
            return {}
    }
}
export default class TableApp extends React.Component {
    render() {
        return (
            <div>
                <button onClick={getDispatcher('PAIR',CellId++)}>
                    add
                </button>
                <table className="table table-bordered">
                    <thead>
                        {this.props.cells.map(cell => {
                            return cell.cellPair
                        })}
                    </thead>
                </table>
                {
                    this.props.cells.filter(cell => {
                        return cell.showProps
                    }).map(cell => {
                        return cell.headProps
                    })
                }
                <button>save</button>
            </div>
        )
    }
}

