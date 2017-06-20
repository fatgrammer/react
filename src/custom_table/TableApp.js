import React from 'react'
import TablePanel from './TablePanel'
import { cellPairs, cellPairApp } from '../reducer/reducers'
import { createStore, combineReducers } from 'redux'
import { addCellPair } from '../action/actions'
import { connect } from 'react-redux'
import { HeadProps } from './HeadProps'
import { PropTypes } from 'prop-types'
export let CellId = 0;
export let store = createStore(cellPairApp)


export const getDispatcher = (level, id, barId) => {
    switch (level) {
        case 'PAIR':
            return () => store.dispatch({
                type: 'ADD_CELLPAIR',
                id
            })
        case 'FIRST':
            return () => store.dispatch({
                type: 'ADD_SECOND',
                id,
                barId
            })
        case 'SECOND':
            return () => store.dispatch({
                type: 'ADD_THIRD',
                id,
                barId
            })
        case 'POP':
            return () => store.dispatch({
                type: 'POP_STRUCTURE',
                id
            })
        case 'DEL_BAR':
            return () => store.dispatch({
                type: 'DELETE_BAR',
                id,
                barId
            })
        default:
            return {}
    }
}
class Button extends React.Component {
    render() {

        return (
            <button onClick={this.props.onClick}>
                add
            </button>
        )
    }
}


class TableScope extends React.Component {
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    {this.props.cells.map(cell => {
                        return cell.cellPair
                    })}
                </thead>
            </table>
        )
    }
}

const getRelPOP = (POPs) => {
    console.log('prop  ', POPs)
    return POPs.filter(
        e => e.showProps
    ).map(e => e.headProps)
}




class ConfigScope extends React.Component {
    render() {
        return (
            <div>
                {getRelPOP(this.props.POPs)}
            </div>
        )
    }
}

const TableApp = ({ cells }, { store }) => {
    const state = store.getState()
    return (
        <div>
            <Button onClick={getDispatcher('PAIR', CellId++)} />
            <TableScope cells={state.cellPairs} />
            <ConfigScope POPs={store.getState().headProps} />
            <button>save</button>
        </div>
    )
}
TableApp.contextTypes = {
    store: PropTypes.object,
    state: PropTypes.object,
    cells: PropTypes.object,
}


export default TableApp

