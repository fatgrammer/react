import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export class GlobalRuleComponents extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <AfterTable />
                        <AutoCal />
                    </thead>
                </table>
            </div>
        )
    }
}
/**
 * 表依赖关系规则
 */
class AfterTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
                this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        console.log('eve',event.target)
        this.setState(
            {
                value: event.target.value
            }
        )
    }

    render() {
        console.log(this.state)
        return (
            <tr>
                <td>afterTalbe</td>
                <td>
                    <SelectField value={this.state.value} onChange={this.handleChange}>
                        <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
                        <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
                        <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
                        <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
                    </SelectField>
                    <button>add</button>
                </td>
            </tr>
        )
    }
}
/**
 * 自动计算规则
 */
class AutoCal extends React.Component {
    render() {
        return (
            <tr>
                <td>autoCal</td>
                <td>
                    <select>
                        <option>字段1</option>
                        <option>字段2</option>
                        <option>字段3</option>
                    </select>
                    <span>=</span>
                    <select>
                        <option>字段1</option>
                        <option>字段2</option>
                        <option>字段3</option>
                    </select>
                    <button>add</button>
                </td>
            </tr>
        )
    }
}