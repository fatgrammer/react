import React from 'react'
import TablePanel from './TablePanel'
import { cellPairs, cellPairApp } from '../reducer/reducers'
import { createStore, combineReducers } from 'redux'
import { addCellPair } from '../action/actions'
import { connect } from 'react-redux'
export let CellId = 0;
export let store = createStore(cellPairApp)


export const getDispatcher = (level, id) => {
    switch (level) {
        case 'PAIR':
            return () => store.dispatch({
                type: 'ADD_CELLPAIR',
                id
            })
        case 'FIRST':
            return () => store.dispatch({
                type: 'ADD_SECOND',
                id
            })
        case 'SECOND':
            return () => store.dispatch({
                type: 'ADD_THIRD',
                id
            })
        case 'POP':
            return () => store.dispatch({
                type: 'POP_STRUCTURE',
                id
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
    return POPs.filter(
        e => e.showProps
    ).map(e => e.headProps)
}

const mapStateToProps = state => {
    return {
        POPs: getRelPOP(state.cellPairs)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCellClick:(id)=>{
            getDispatcher("PAIR",id)
        }
    }
}
const TempScope =   connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadProps)
class ConfigScope extends React.Component {
    render() {
        return (
            <div>
                {getRelPOP(this.props.POPs)}
            </div>
        )
    }
}

const TableApp = ({ cells }, { store }, { state }) => {
    return (
        <div>
            <Button onClick={getDispatcher('PAIR', CellId++)} />
            <TableScope cells={store.getState().cellPairs} />
            <ConfigScope POPs={store.getState().cellPairs} />

            <button>save</button>
        </div>
    )
}
TableApp.contextTypes = {
    store: React.PropTypes.object,
    state: React.PropTypes.object,
    cells: React.PropTypes.object
}

export default TableApp

