import React from 'react'
import { Button } from './Widget'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import { PropTypes } from 'prop-types'

export class EditBox extends React.Component {
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
        const hb = this.props.headBlock
        const props = this.props
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
                            addButton={
                                head.height < 2 ?
                                    <span><Button id='nextLevel' glyphicon={<div id='cross' ></div>} value='增加下一级单元'
                                        onClick={
                                            () => props.onLvlAddClick(head.prefix, headPak.id, head.head)
                                        }
                                    /></span> : null}
                            delButton={head.height > 0 ?
                                <Button id='delButton' value='删除' onClick={
                                    () => props.onDelLvl(headPak.id, head.prefix)
                                } /> : <Button id='delPakButton' value='DELPAK' onClick={
                                    () => props.onDelPak(headPak.id)
                                } />
                            }
                            value={this.state.value}
                            onValueChange={this.onValueChange}
                            headValue={head.value}
                            onInput={this.props.onInput}
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
                            () => props.onCloseEdit()
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
                    onValueChange={this.props.onValueChange}
                    onInput={this.props.onInput}
                />
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
        });
        this.props.onInput(
            this.props.prefix,
            event.target.value,
            this.props.actionId
        );
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