import React from 'react'
import { Button } from './Widget'
import $ from 'jquery'

import RaisedButton from 'material-ui/RaisedButton';

export class RuleBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableName: '',
            tableField: ''
        }
        this.handleName = this.handleName.bind(this)
        this.handleField = this.handleField.bind(this)
    }
    handleName(tableName) {
        this.setState({
            tableName
        })
    }
    handleField(tableField) {
        this.setState({
            tableField
        })
    }
    render() {
        const data = this.props.metaData.filter(t => t.shown)
        const key = data[0] ? data[0].fieldId : ''
        const name = data[0] ? data[0].name : '';

        const radio = data.map(dataPak => dataPak.radio)
        const input = data.map(dataPak => dataPak.input)
        const select = data.map(dataPak => dataPak.select)

        const refer = select.length ? select[0] : []

        const refBox = data.map(dataPak => dataPak.refBox)
        return <div key={key}>
            <h1>{key}------{name}</h1>
            <table>
                <thead>
                    {this.renRadio(radio)}
                    {this.renInput(input)}
                    {this.renSelect(refer, key)}
                    {this.renRefBox(refBox, key)}
                </thead>
            </table>
            <OptionScope hide={this.props.hide} onCloseOptions={this.props.onCloseOptions} options={refer} />
            <Button onClick={() => this.props.saveRule(
                this.props.metaData
            )} value='save' />
            <FloatingBox data={refBox} />
        </div>
    }
    renRadio(radio) {
        return radio.map(rule => {
            return Object.entries(rule).map(ele => {
                return <tr>
                    <td>{ele[0]}</td>
                    <td>
                        <input name={ele[0]} type='radio' />true
                                    <input name={ele[0]} type='radio' />false
                                </td>
                </tr>
            })
        })
    }
    renInput(input) {
        return input.map(rule => {
            return Object.entries(rule).map(ele => {
                return <tr>
                    <td>{ele[0]}</td><td><input style={{ width: '100%' }} /></td>
                </tr>
            })
        })
    }
    renSelect(refer, key) {
        return refer.length ? <tr key={0}  onClick={this.props.onOpenOptions} >
            <td>reference</td>
            <td><select id='refBox' style={{ float: 'left' }}>
                {refer.map(item => {
                    return <option key={item}>{item}</option>
                })}</select>
                <OptionConf addOption={this.props.addOption} fieldId={key} />
            </td>
        </tr> : null
    }
    renRefBox(refBox, fieldId) {
        const props = this.props
        return refBox.length ?
            <tr>
                <td>ForeignField</td>
                <td>
                    <RefSelects tableList={props.tableList}
                        handleName={this.handleName}
                        onSelectChange={props.onRefBoxChange} />

                    <RefFields handleField={this.handleField}
                        rawData={props.rawData} />
                    <Button primary value='add' 
                        onClick={() =>
                            props.addRefField(
                                this.state.tableName, this.state.tableField, fieldId
                            )}
                    />
                </td>
            </tr>
            : null
    }
}

class RefFields extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            tableField: ''
        }
    }
    handleChange(event) {
        this.props.handleField(event.target.value)
    }
    render() {
        const entries = Object.entries(this.props.rawData)
        return <select onChange={this.handleChange}>{[<option key={-1}></option>, ...entries.map(head => {
            return <option key={head[0]} value={head} >{head[1]}</option>
        })]}</select>
    }
}
class RefSelects extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.props.handleName(event.target.value)
        this.props.onSelectChange(event.target.value)
    }

    render() {
        return <select onChange={this.handleChange} defaultValue=''>
            {[
                <option value={-1} key={-1} ></option>,
                ...this.props.tableList.map(ele => {
                    return <option value={ele} key={ele}>{ele}</option>
                })
            ]}
        </select>
    }
}
class FloatingBox extends React.Component {
    render() {
        return this.props.data.length > 0 ? <div id='refScope'>
            <ul>
                {this.props.data[0].map(ele => {
                    return <li key={ele}> {ele.reduce((prev, next) => {
                        return prev + '__' + next
                    })}</li>
                })}
            </ul>
        </div> : null
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
        return () => this.props.addOption(
            this.props.fieldId,
            this.state.value
        )
    }
    render() {
        return <span>
            <input style={{ float: 'left' }} onChange={this.handleChange} />
            <Button primary onClick={this.handleClick()} id='addOp' value="add" />
        </span>
    }
}
class OptionScope extends React.Component {
    render() {
        return this.props.hide ? <div id='opScope'>
            <span>Options</span>
            <div onClick={()=>this.props.onCloseOptions()} className='close'>{`\u00d7`}</div>
            <ul>
                {this.props.options.map(option => {
                    return <li key={option}>{option}</li>
                })}
            </ul>
        </div>: null
    }
}

