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

import { Table } from 'react-bootstrap/lib';
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
        case 'SIDE':
            return () => store.dispatch({
                type: 'SHOW_SIDEBAR',
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
                    type: 'RESULT',
                    ...data
                })
            }
        case 'RULE':
            return () => {
                store.dispatch({
                    type: 'POP_RULE',
                    ...data
                })
            }
        case 'CLOSE':
            return () => {
                store.dispatch({
                    type: 'CLOSE_POPBAR'
                })
            }
        case 'DEL':
            return () => {
                store.dispatch({
                    type: 'DELETE_BAR',
                    ...data
                })
            }
        default:
            return {}
    }
}
class Button extends React.Component {
    render() {
        return (
            <div id={this.props.id} onClick={this.props.onClick}>
                {this.props.glyphicon}{this.props.value}
            </div>
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
                            addButton={head.height < 2 ? <span><Button id='nextLevel' glyphicon={<div id='cross' ></div>} value='增加下一级单元'
                                onClick={
                                    actions('INS', {
                                        prefix: head.prefix,
                                        id: headPak.id,
                                        head: head.head
                                    })
                                }
                            /></span> : null}
                            delButton={head.height > 0 ?
                                <Button id='delButton' value='删除' onClick={
                                    actions('DEL', {
                                        id: headPak.id,
                                        prefix: head.prefix
                                    })
                                } /> : null
                            }
                            value={this.state.value}
                            onValueChange={this.onValueChange}
                            headValue={head.value}
                        >
                            <span style={{
                                float: 'left'
                            }} className='popText'>表单元名称{Array(head.height + 2).join('--')}</span>
                        </Li>
                    })
                })
            });
        return (
            <CSSTransitionGroup
                transitionName="background"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                component='div'
            >
                {this.props.display ?
                    <div className='popHead' id='popHead'>
                        <div onClick={actions('CLOSE')}
                            id='closeX'>{`\u00d7`}</div>
                        <span style={{ marginLeft: '40%' }} className='popText'>表单元属性</span>
                        <ul>
                            {popContent}
                        </ul>
                    </div > : null
                }
            </CSSTransitionGroup>
        )
    }
}
class Li extends React.Component {
    render() {
        return (
            <li>{this.props.head}
                {this.props.children}
                <InputHead
                    prefix={this.props.prefix}
                    actionId={this.props.actionId}
                    headValue={this.props.headValue}
                    onValueChange={this.props.onValueChange} />
                {this.props.saveButton}
                {this.props.addButton}
                {this.props.delButton}

            </li>
        )
    }
}
class InputHead extends React.Component {
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
        store.dispatch({
                type: 'SAVE_HEAD',
                prefix: this.props.prefix,
                value: this.state.value,
                id: this.props.actionId
        })
        this.props.onValueChange(event.target.value)
    }
    render() {
        return <span><input style={{
            float: 'left'
        }}
            placeholder='table head'
            value={this.state.value}
            onChange={this.handleChange}

        />
            <Button id='tmpSave' value='save'
                onClick={actions('STH', {
                    prefix: this.props.prefix,
                    value: this.state.value,
                    id: this.props.actionId
                })} />
        </span>
    }
}
const headBlock = (metaData = []) => {
    const maxDepth = metaData.map(headPak => headPak.trie.maxDepth).reduce((prev, next) => {
        return prev >= next ? prev : next
    }, {})
    return metaData.map(ele => {
        return {
            data: boxHeight(ele.trie.inOrderData(), maxDepth),
            shownProp: ele.shownProp,
            id: ele.id
        }
    })
}
const boxHeight = (boxStacks, maxDepth) => {
    return boxStacks.map(
        boxStack => {
            const rDepth = maxDepth - boxStack[boxStack.length - 1].depth + 1
            return [...boxStack.slice(0, boxStack.length - 1),
            {
                ...boxStack[boxStack.length - 1],
                depth: rDepth //> 1 ? rDepth : 1
            },
            ...boxStack.slice(boxStack.length)
            ]
        }
    )

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
                return heads.map(head => head.value).reduce((prev, next) => {
                    return prev + '_' + next
                })
            })
        }).reduce((prev, next) => {
            return [...prev, ...next]
        }, [])
        return <div>
            <hr />
            <Button id='result' value='完成' onClick={actions('RES', {
                url: 'http://localhost:20080/testData',
                data: { data: JSON.stringify(list) }
            })} /><br />
            {JSON.stringify(list)}</div>

    }
}

class RuleScope extends React.Component {
    render() {
        return <div>
            <Table bordered>
                <thead>
                    {this.props.metaData.map(
                        dataPak => {
                            return dataPak.rule
                        }
                    ).map(rule => {
                        return Object.entries(rule).map(ele => {
                            return <tr>
                                <td>{ele[0]}</td>
                                <td>
                                    <input type='radio' name={ele[0]} />true
                                    <input name={ele[0]} type='radio' />false
                                </td>
                            </tr>
                        })
                    })}
                </thead>
            </Table>
        </div>
    }
}
let newId = 0
const TableApp = ({ cells }, { store }) => {
    const state = store.getState()
    return (
        <div >
            <div style={{
                marginLeft: '1em'
            }} >
                <div id='uname'>肥刘大学</div>
                <hr />
                <Button onClick={getDispatcher('ADD', newId++)} id='addButton' value='新增单元' />
                {/*<Button onClick={getDispatcher('PAIR', CellId++)} value='add' />*/}
                {/*<TableScope cells={state.cellPairs} />*/}
                {/*<ConfigScope POPs={store.getState().headProps} />*/}
                <br /><br /><br />
                <NewScope metaData={store.getState().theadPak} />
                <ResultScope metaData={store.getState().theadPak} />
                <RuleScope metaData={store.getState().dataRule} />
            </div>

            <PopScope display={store.getState().popBox} metaData={store.getState().theadPak} />
        </div>
    )
}
TableApp.contextTypes = {
    store: PropTypes.object,
    state: PropTypes.object,
    cells: PropTypes.object,
}


export default TableApp

