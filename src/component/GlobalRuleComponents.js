import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

const buttonStyle = {
    marginRight: 20,
};
const paperStyle = {
    height: 500,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};


export class GlobalRuleComponents extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <AfterTable tableList={this.props.tableList} getAfterTable={this.props.getAfterTable} />
                        <AutoCal />
                    </thead>
                </table>
                <Option delAfterTable={this.props.delAfterTable} />
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
            value: 0
        };
    }
    handleChange = (event, index, value) => this.setState({ value });
    render() {
        return (
            <tr>
                <td>afterTalbe</td>
                <td>
                    <SelectField value={this.state.value} onChange={this.handleChange}>
                        {this.props.tableList.map((ele, i) => <MenuItem value={i} key={i} label={ele} primaryText={ele} />)}
                    </SelectField>
                    <FloatingActionButton mini={true} secondary={true} style={buttonStyle} onClick={()=>this.props.getAfterTable()} >
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
                    <FloatingActionButton mini={true} secondary={true} style={buttonStyle}>
                        <ContentAdd />
                    </FloatingActionButton>
                </td>
            </tr>
        )
    }
}
/**
 * 弹框
 */
class Option extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Paper style={paperStyle} zDepth={3} rounded={true} children={<ListExampleSimple key="111" delAfterTable={this.props.delAfterTable} />} />
            </div>
        )
    }
}
/**
 * 弹框内部列表
 */
class ListExampleSimple extends React.Component {

    constructor(props) {
        super(props)
        this.state = { list: ["表1", "表2", "表3"] }
    }
    render() {
        return (
            <List>
                {this.state.list.map((ele, i) => <ListItem primaryText={ele} key={i} rightIcon={<ActionDeleteForever onClick={() => this.props.delAfterTable({ele})}/>} />)}
            </List>
        )
    }
}