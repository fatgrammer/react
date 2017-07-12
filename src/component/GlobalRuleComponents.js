import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
    marginRight: 20,
};

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
    state = {
        value: 1,
    };
    handleChange = (event, index, value) => this.setState({ value });
    render() {
        return (
            <tr>
                <td>afterTalbe</td>
                <td>
                    <SelectField value={this.state.value} onChange={this.handleChange}>
                        <MenuItem value={1} label="表1" primaryText="表1" />
                        <MenuItem value={2} label="表2" primaryText="表2" />
                        <MenuItem value={3} label="表3" primaryText="表3" />
                        <MenuItem value={4} label="表4" primaryText="表4" />
                    </SelectField>
                    <FloatingActionButton mini={true} secondary={true} style={style}>
                        <ContentAdd />
                    </FloatingActionButton>
                </td>
            </tr>
        )
    }
}
/**
 * 自动计算规则
 */
class AutoCal extends React.Component {
    state = {
        value: 1,
    };
    handleChange = (event, index, value) => this.setState({ value });
    render() {
        return (
            <tr>
                <td>autoCal</td>
                <td>
                    <SelectField value={this.state.value} onChange={this.handleChange}>
                        <MenuItem value={1} label="字段1" primaryText="字段1" />
                        <MenuItem value={2} label="字段2" primaryText="字段2" />
                        <MenuItem value={3} label="字段3" primaryText="字段3" />
                        <MenuItem value={4} label="字段4" primaryText="字段4" />
                    </SelectField>
                    <span>=</span>
                    <SelectField value={this.state.value} onChange={this.handleChange}>
                        <MenuItem value={1} label="字段1" primaryText="字段1" />
                        <MenuItem value={2} label="字段2" primaryText="字段2" />
                        <MenuItem value={3} label="字段3" primaryText="字段3" />
                        <MenuItem value={4} label="字段4" primaryText="字段4" />
                    </SelectField>
                    <FloatingActionButton mini={true} secondary={true} style={style}>
                        <ContentAdd />
                    </FloatingActionButton>
                </td>
            </tr>
        )
    }
}