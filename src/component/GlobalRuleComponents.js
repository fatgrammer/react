import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { SlideFX } from './FX';
import { RedX, Button } from './Widget'
import $ from 'jquery'
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
    componentWillMount() {
        this.props.getRawHeads(this.props.tableName)
        $.getJSON('http://192.168.1.249:20080/globalRule/' + this.props.tableName, (data) => {
            this.props.initCalcEle(data.expression)
        })
    }
    render() {
        return (
            <SlideFX>{
                this.props.shown ?
                    <Paper zDepth={3} rounded={true} className='ruleBox'>
                        <RedX onClick={this.props.closeGRuleBox} />
                        <table>
                            <caption style={{ fontSize: '2em' }}>Table Rule</caption>
                            <thead>
                                <AfterTable tableList={this.props.tableList} addAfterTable={this.props.addAfterTable} />
                                <AutoCal
                                    delCalcEle={this.props.delCalcEle}
                                    fieldList={this.props.fieldList}
                                    addRuleElement={this.props.addRuleElement}
                                    calcRuleSeq={this.props.calcRuleSeq}
                                    altCalcEle={this.props.altCalcEle}
                                    saveCalcEle={this.props.saveCalcEle}
                                    tableName={this.props.tableName}
                                />
                            </thead>
                        </table>
                        <Option delAfterTable={this.props.delAfterTable} afterList={this.props.afterList} />
                    </Paper> : null}
            </SlideFX>
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
            value: null
        };
    }
    handleChange = (event, index, value) => this.setState({ value });
    render() {
        return (
            <tr>
                <td>afterTalbe</td>
                <td>
                    <SelectField value={this.state.value} onChange={this.handleChange}>
                        {this.props.tableList.map((ele, i) => <MenuItem value={ele} key={i} label={ele} primaryText={ele} />)}
                    </SelectField>
                    <Button secondary value='+' onClick={() => this.props.addAfterTable(this.state.value)} >
                        <ContentAdd />
                    </Button>
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
                    <Button value='FieldElement'
                        onClick={() => this.props.addRuleElement('fieldElement')} />
                    <Button value='Operator'
                        onClick={() => this.props.addRuleElement('operator')} />
                    {this.props.calcRuleSeq.map((ele, idx) =>
                        ele.eleType === 'fieldElement' ?
                            <FieldSelector
                                calcRuleSeq={this.props.calcRuleSeq}
                                altCalcEle={this.props.altCalcEle}
                                delCalcEle={this.props.delCalcEle}
                                key={ele.id} id={ele.id}
                                fieldList={this.props.fieldList} /> :
                            <OperatorSelector
                                calcRuleSeq={this.props.calcRuleSeq}
                                altCalcEle={this.props.altCalcEle}
                                delCalcEle={this.props.delCalcEle}
                                key={ele.id} id={ele.id} />
                    )}
                    <Button value='save'
                        onClick={() => this.props.saveCalcEle(this.props.tableName)} primary />
                </td>
            </tr>
        )
    }
}
class FieldSelector extends React.Component {
    // state = {
    //     value: this.props.calcRuleSeq.filter(ele => ele.id === this.props.id)[0]
    // }
    handleChange = (event, index, value) => {
        // this.setState({ value })
        this.props.altCalcEle(value, this.props.id)
    };
    render() {
        // console.log('flist', this.props.fieldList)
        const cEle = this.props.calcRuleSeq.filter(ele => ele.id === this.props.id)[0];
        return <span><SelectField value={cEle.element} key='fieldElement' onChange={this.handleChange}>
            {Object.entries(this.props.fieldList).map(ele => {
                {/* console.log('elemenet', ele) */ }
                return <MenuItem key={ele[1]} value={ele[0]} label={ele[1]} primaryText={ele[1]} />
            })}
        </SelectField><Button onClick={() => this.props.delCalcEle(this.props.id)} value='del' secondary /></span>
    }
}
class OperatorSelector extends React.Component {
    state = {
        value: 0
    }
    handleChange = (event, index, value) => {
        this.setState({ value });

        this.props.altCalcEle(event.target.innerHTML, this.props.id)
    }
    render() {
        const cEle = this.props.calcRuleSeq.filter(ele => ele.id === this.props.id)[0];
        return <span><SelectField value={cEle.element} key='operator' onChange={this.handleChange}>
            <MenuItem value='+' label='+' primaryText='+' />
            <MenuItem value='-' label='-' primaryText='-' />
            <MenuItem value='*' label='*' primaryText='*' />
            <MenuItem value='/' label='/' primaryText='/' />
            <MenuItem value='=' label='=' primaryText='=' />
        </SelectField><Button onClick={() => this.props.delCalcEle(this.props.id)} value='del' secondary /></span>
    }
}
/**
 * 弹框
 */
class Option extends React.Component {
    render() {
        return (
            <div>
                <Paper style={paperStyle} zDepth={3}
                    rounded={true}
                ><ListExampleSimple key="111"
                    delAfterTable={this.props.delAfterTable}
                    afterList={this.props.afterList} />
                </Paper>
            </div>
        )
    }
}
/**
 * 弹框内部列表
 */
class ListExampleSimple extends React.Component {
    render() {
        return (
            <List>
                {this.props.afterList.map((ele, i) => <ListItem primaryText={ele} key={i} rightIcon={<ActionDeleteForever onClick={() => this.props.delAfterTable(ele)} />} />)}
            </List>
        )
    }
}