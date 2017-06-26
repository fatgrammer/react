import React from 'react'
import TablePanel from './TablePanel'
import { cellPairs, cellPairApp } from '../reducer/reducers'
import { createStore, combineReducers } from 'redux'
import { addCellPair } from '../action/actions'
import { connect } from 'react-redux'
import { HeadProps } from './HeadProps'
import { PropTypes } from 'prop-types'
import EdiTable from '../EdiTable'
import '../global.css'
import { CSSTransitionGroup } from 'react-transition-group'
export let CellId = 0;
export let store = createStore(cellPairApp)


export const getDispatcher = (level, id, barId) => {
    switch (level) {
        case 'ADD':
            return () => store.dispatch({
                type: 'ADD',
                id
            })
        case 'INS':
            return () => store.dispatch({
                type: 'INSERT',
                id
            })
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
export const actions = (abbr, data) => {
    switch (abbr) {
        case 'INS':
            return () => store.dispatch({
                ...data,
                type: 'INSERT'
            })
        case 'POP':
            return () => store.dispatch({
                type: 'POP_HEAD',
                ...data
            })
        default:
            return {}
    }
}
class Button extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.value}
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
const NewScope = (metaData) => {
    const hb = headBlock(metaData.metaData)
    // const ch = calcHorHead(metaData.metaData)
    // console.log('headData', ch)
    // console.log('headLength', depthHead(ch[0]))

    return (
        <EdiTable
            //           hhead={ch}
            //           bodyLength={cellNum(ch[0])}
            vhead={hb}
        />
    )
}
let localIdx = 0
class PopScope extends React.Component {
    render() {
        const hb = headBlock(this.props.metaData)
        return (

            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                component='ul'
            >

                {hb.filter(headPak => {
                    return headPak.shownProp;
                }).map(headPak => {
                    return headPak.data.map(heads => {
                        return heads.map(head => {
                            return <Li>{head.prefix}{head.head}</Li>
                        })
                    })
                })
                }
            </CSSTransitionGroup>


        )
    }
}
class Li extends React.Component {
    render() {
        return (
            <li>{this.props.children}</li>
        )
    }
}
const headBlock = (metaData) => {
    return metaData.map(ele => {
        return {
            data: ele.trie.inOrderData(),
            shownProp: ele.shownProp
        }
    })
    // let tmpData=[]
    // for (let i = 0; i < metaData.length; ++i) {
    //     return metaData[i].trie.inOrderData()
    // }
}
const depthHead = (headData = []) => {
    console.log('hdata ', headData)
    return headData.map(e => {
        return e ? e.rowSpan : 0
    }).reduce((prev, next) => {
        console.log('p, ', prev, 'n ', next)
        return prev + next
    }, 0)
}
const cellNum = (headData = []) => {
    return headData.map(e => {
        return e ? e.colSpan : 0
    }).reduce((prev, next) => {
        console.log('p, ', prev, 'n ', next)
        return prev + next
    }, 0)

}
const calcHorHead = (metaData) => {
    console.log('trial ', metaData)
    return metaData.map(ele => {
        {/*console.log('head is ', ele.trie.traverse())*/ }
        return ele.trie.traverse()
    }).reduce((prev, next) => {
        let tmp = []
        for (let i = 0; i < 3; ++i) {
            // console.log('loc ', prev)
            let prevTemp = prev[i] || []
            tmp[i] = prevTemp.concat(next[i]);
        }
        return tmp
    }, [])
}

let newId = 0
const TableApp = ({ cells }, { store }) => {
    const state = store.getState()
    return (
        <div className="container">
            <Button onClick={getDispatcher('ADD', newId++)} value='newAdd' />
            {/*<Button onClick={getDispatcher('PAIR', CellId++)} value='add' />*/}
            {/*<TableScope cells={state.cellPairs} />*/}
            {/*<ConfigScope POPs={store.getState().headProps} />*/}
            <NewScope metaData={store.getState().theadPak} />
            <PopScope metaData={store.getState().theadPak} />
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

