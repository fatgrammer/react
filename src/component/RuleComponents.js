import React from 'react'
import { Button } from './Widget'
import $ from 'jquery'
export class RuleBox extends React.Component {

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
                    {this.renRefBox(refBox)}
                </thead>
            </table>
            <OptionScope hide={this.props.hide} onCloseOptions={this.props.onCloseOptions} options={refer} />
            <Button onClick={() => this.props.saveRule(
                this.props.metaData
            )} value='save' />
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
    renRefBox(refBox) {
        return refBox.length ?
            <tr>
                <td>ForeignField</td>
                <td>
                    <RefSelects onSelectChange={this.props.onRefBoxChange} />
                    <RefFields rawData={this.props.rawData}/>
                </td>
            </tr>
            : null
    }
}
class RefFields extends React.Component {
    render() {
        return <select>{this.props.rawData}</select>
    }
}
class RefSelects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableList: []
        }
    }
    componentDidMount() {
        $.getJSON('http://192.168.1.249:20080/tableList', (ret) => {
            console.log('ret', ret)
            this.setState({
                tableList: ret
            })
        })
    }
    render() {
        return <select >{
            [
                <option selected='selected'></option>,
                ...this.state.tableList.map(ele => {
                    return <option>{ele}</option>
                })
            ]}</select>
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
            <Button onClick={this.handleClick()} id='addOp' value="add" />
        </span>
    }
}
class OptionScope extends React.Component {
    render() {
        console.log("props", this.props.hide);
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