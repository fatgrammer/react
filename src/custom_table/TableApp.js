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

import { Col, Row } from 'react-bootstrap/lib';

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
        case 'STH':
            return () => store.dispatch({
                type: 'SAVE_HEAD',
                ...data
            })
        case 'RES':
            return () => {
                store.dispatch({
                    type: 'RESULT'
                })
            }
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
class NewScope extends React.Component {
    render() {
        const hb = headBlock(this.props.metaData)
        return (
            <EdiTable
                vhead={hb}
            />
        )
    }
}
class PopScope extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this)
        this.state = { value: '' }
    }
    onValueChange(value) {
        this.setState({
            value
        })
    }
    componentDidMount() {
        this.setState({
            value: ''
        })
    }
    render() {
        const hb = headBlock(this.props.metaData)
        const popContent =
            hb.filter(headPak => {
                return headPak.shownProp;
            }).map(headPak => {
                return headPak.data.map(heads => {
                    let lidx = 0;
                    return heads.map(head => {
                        return <Li
                            key={head.head}
                            prefix={head.prefix}
                            actionId={headPak.id}
                            addButton={head.height < 2 ? <Button value='add'
                                onClick={
                                    actions('INS', {
                                        prefix: head.prefix,
                                        id: headPak.id,
                                        head: head.head
                                    })
                                }
                            /> : <span></span>}
                            value={this.state.value}
                            onValueChange={this.onValueChange}
                            headValue={head.value}
                        >
                            {head.head + Array(head.height + 2).join('--')}</Li>
                    })
                })
            });

        return (
            <div className='popHead'>
                <CSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1}
                    component='ul'
                >
                    {popContent}
                </CSSTransitionGroup>
            </div>
        )
    }
}
class Li extends React.Component {
    render() {
        return (
            <li>{this.props.head}
                {this.props.children}
                <Input
                    prefix={this.props.prefix}
                    actionId={this.props.actionId}
                    headValue={this.props.headValue}
                    onValueChange={this.props.onValueChange} />
                {this.props.saveButton}
                {this.props.addButton}

            </li>
        )
    }
}
class Input extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = ({
            value: this.props.headValue
        })
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        })
        this.props.onValueChange(event.target.value)
    }
    render() {
        return <span> <input
            placeholder='table head'
            value={this.state.value}
            onChange={this.handleChange}

        />
            <Button value='save'
                onClick={actions('STH', {
                    prefix: this.props.prefix,
                    value: this.state.value,
                    id: this.props.actionId
                })} />
        </span>
    }
}
const headBlock = (metaData) => {
    return metaData.map(ele => {
        return {
            data: ele.trie.inOrderData(),
            shownProp: ele.shownProp,
            id: ele.id
        }
    })
}
const fullHeadBlock = (metaData) => {
    return metaData.map(ele => {
        return {
            data: ele.trie.inOrderFullData(),
        }
    })
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
class ResultScope extends React.Component {
    render() {
        const hb = fullHeadBlock(this.props.metaData)
        let list = hb.map(headPak => {
            return headPak.data.map(heads => {
                // return heads.reduce((prev, next) => {
                //     return prev.value || '' + '_' + next.value + '_'
                // }, '_')
                console.log('heads', heads)
                return heads[heads.length- 1].value
            }).reduce((prev, next) => {
                return [...prev, next]
            }, [])
        }).reduce((prev, next) => {
            return [...prev, next]
        }, [])
        console.log('list', list)
        return <span>2</span>

    }
}
let newId = 0
const TableApp = ({ cells }, { store }) => {
    const state = store.getState()
    return (
        <div className="flex-container">
            <div className='flex-item' >
                <Button onClick={getDispatcher('ADD', newId++)} value='newAdd' />
                {/*<Button onClick={getDispatcher('PAIR', CellId++)} value='add' />*/}
                {/*<TableScope cells={state.cellPairs} />*/}
                {/*<ConfigScope POPs={store.getState().headProps} />*/}
                <NewScope metaData={store.getState().theadPak} />
                <ResultScope metaData={store.getState().theadPak} />
                <Button value='result' onClick={actions('RES')} />
            </div>

            <PopScope className='flex-item' metaData={store.getState().theadPak} />
        </div>
    )
}
TableApp.contextTypes = {
    store: PropTypes.object,
    state: PropTypes.object,
    cells: PropTypes.object,
}


export default TableApp

