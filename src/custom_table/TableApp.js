import React from 'react'
import { cellPairApp } from '../reducer/reducers'
import { createStore } from 'redux'
import { PropTypes } from 'prop-types'
import EdiTable from '../EdiTable'
// import '../global.css'
import { CSSTransitionGroup } from 'react-transition-group'

export let CellId = 0;
export let store = createStore(cellPairApp)

export const atod = (type, data) => () => store.dispatch({
    type,
    ...data
})

class Button extends React.Component {
    render() {
        return (
            <div id={this.props.id} onClick={this.props.onClick}>
                {this.props.glyphicon}{this.props.value}
            </div>
        )
    }
}

class NewScope extends React.Component {
    render() {
        headBlock(this.props.metaData)
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
    render() {
        const hb = headBlock(this.props.metaData)
        const popContent =
            hb.filter(headPak => {
                return headPak.shownProp;
            }).map(headPak => {
                return headPak.data.map(heads => {
                    return heads.map(head => {
                        return <Li
                            key={head.head}
                            prefix={head.prefix}
                            actionId={headPak.id}
                            addButton={head.height < 2 ? <span><Button id='nextLevel' glyphicon={<div id='cross' ></div>} value='增加下一级单元'
                                onClick={
                                    atod('INSERT', {
                                        prefix: head.prefix,
                                        id: headPak.id,
                                        head: head.head
                                    })
                                }
                            /></span> : null}
                            delButton={head.height > 0 ?
                                <Button id='delButton' value='删除' onClick={
                                    atod('DELETE_BAR', {
                                        id: headPak.id,
                                        prefix: head.prefix
                                    })
                                } /> : <Button id='delPakButton' value='DELPAK' onClick={
                                    atod('DELETE_PAK', {
                                        id: headPak.id
                                    })
                                } />
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
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                component='div'
            >
                {this.props.display ?
                    <div className='popHead' id='popHead'>
                        <div onClick={
                            atod('CLOSE_POPBAR')
                        }
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
            value: event.target.value,
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
        </span>
    }
}
const headBlock = (metaData = []) => {
    const maxDepth = metaData.map(headPak => headPak.trie.maxDepth).reduce((prev, next) => {
        return prev >= next ? prev : next
    }, 0)
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
            data: ele.trie.inOrderFullData()
        }
    })
}
class ResultScope extends React.Component {
    render() {
        const hb = fullHeadBlock(this.props.content)
        let list = {};
        list = {
            ...this.props.head,
            ...list
        }
        list = {
            ...list,
            ...hb.map(headPak => {
                return headPak.data.map(heads => {
                    return {
                        [heads[heads.length - 1].head]:
                        heads.map(head => head.value).reduce((prev, next) => {
                            return prev + '_' + next
                        })
                    }
                })
            }).reduce((prev, next) => {
                return [...prev, ...next]
            }, []).reduce((prev, next) => {
                return { ...prev, ...next }
            }, {})
        }
        return <div>
            <hr />
            <Button id='result' value='完成' onClick={
                atod('RESULT', {
                    url: 'http://192.168.1.249:20080/customTable',
                    data: { data: JSON.stringify(list) }
                })
            } /><br />
            <br /><br />
            <hr />
            {JSON.stringify(list)}

            <Button id='test' value='test' onClick={
                atod('TABLE_HEADS', {
                    url: 'http://192.168.1.249:20080/tableTemp/',
                    tableName: this.props.head.tableName
                })
            }
            />
        </div>

    }
}
class RuleScope extends React.Component {
    render() {
        const data = this.props.metaData.filter(t => t.shown)
        const key = data[0] ? data[0].fieldId : ''
        const name = data[0] ? data[0].name : '';
        const radio = data.map(dataPak => dataPak.radio)
        const input = data.map(dataPak => dataPak.input)
        const select = data.map(dataPak => dataPak.select)
        const refer = select.length ? select[0] : []
        console.log('refer ', select)

        return <div key={key}>
            <h1>{name}-{key}</h1>
            <table>
                <thead>
                    {radio.map(rule => {
                        return Object.entries(rule).map(ele => {
                            return <tr>
                                <td>{ele[0]}</td>
                                <td>
                                    <input name={ele[0]} type='radio' />true
                                    <input name={ele[0]} type='radio' />false
                                </td>
                            </tr>
                        })
                    })}
                    {
                        input.map(rule => {
                            return Object.entries(rule).map(ele => {
                                return <tr>
                                    <td>{ele[0]}</td><td><input style={{ width: '100%' }} /></td>
                                </tr>
                            })
                        })
                    }
                    {refer.length ? <tr key={0} >
                        <td>reference</td>
                        <td><select id='refBox' style={{ float: 'left' }}>
                            {refer.map(item => {
                                console.log('item', item)
                                return <option key={item}>{item}</option>
                            })}</select>
                            <OptionConf fieldId={key} />
                        </td>
                    </tr> : null
                    }
                </thead>
            </table>
            <OptionScope options={refer} />
            <Button onClick={atod('SAVE_RULE',{
                data:this.props.metaData
            })} value='save'/>
            {/*<Button onClick={atod('FETCH_RULE',{
                url:'http://192.168.1.42:20080/tableRule/',
                tableName:this.props.name.tableName
            })} value='get'/>*/}
        </div>
    }
}
class OptionConf extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }
    handleClick() {
        return atod('ADD_OPTION', {
            fieldId: this.props.fieldId,
            value: this.state.value
        })
    }
    render() {
        return <span>
            <input style={{ float: 'left' }} onChange={this.handleChange} />
            <Button onClick={this.handleClick()} id='addOp' value="add" />
        </span>
    }
}
class OptionScope extends React.Component {
    render() {
        console.log('oscp',this.props.options)
        return <div id='opScope'>
            <span>Options</span>
            <ul>
                {this.props.options.map(option => {
                  return <li key={option}>{option}</li>
                })}
            </ul>
        </div>
    }
}
class TableTitle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            name: event.target.value
        });
        store.dispatch({
            type: 'TABLE_NAME',
            tableName: event.target.value
        })
    }
    render() {
        return <input value={this.state.name} onChange={this.handleChange} />
    }
}
let newId = 0
const TableApp = ({ cells }, { store }) => {
    return (
        <div >
            <div style={{
                marginLeft: '1em'
            }} >
                <div id='uname'>肥刘研究院</div>
                <hr />
                <code>TableName: </code><TableTitle name={store.getState().tableInfo} />
                <hr />
                <Button onClick={atod('ADD', { id: newId++ })} id='addButton' value='新增单元' />
                <br /><br /><br />
                <NewScope metaData={store.getState().theadPaks} />
                <ResultScope content={store.getState().theadPaks} head={store.getState().tableInfo} />
                <RuleScope metaData={store.getState().dataRule} name={store.getState().tableInfo}/>
            </div>
            <PopScope display={store.getState().popBox} metaData={store.getState().theadPaks} />
        </div>
    )
}
TableApp.contextTypes = {
    store: PropTypes.object,
    state: PropTypes.object,
    cells: PropTypes.object,
}


export default TableApp

