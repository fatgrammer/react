import React from 'react'
import { Button } from './Widget'
export class RuleBox extends React.Component {
    render() {
        const data = this.props.metaData.filter(t => t.shown)
        const key = data[0] ? data[0].fieldId : ''
        const name = data[0] ? data[0].name : '';
        const radio = data.map(dataPak => dataPak.radio)
        const input = data.map(dataPak => dataPak.input)
        const select = data.map(dataPak => dataPak.select)
        const refer = select.length ? select[0] : []

        return <div key={key}>
            <h1>{key}------{name}</h1>
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
                                return <option key={item}>{item}</option>
                            })}</select>
                            <OptionConf addOption={this.props.addOption} fieldId={key} />
                        </td>
                    </tr> : null
                    }
                </thead>
            </table>
            <OptionScope options={refer} />
            <Button onClick={() => this.props.saveRule(
                this.props.metaData
            )} value='save' />
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