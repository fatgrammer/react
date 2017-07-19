import React from 'react'
// import PropTypes from 'prop-types'
import { Button } from './Widget'
import { TheadRen } from './TableRen'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

let mainId = 0;
export class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onFixHead: true
        }
        this.showFixHead = this.showFixHead.bind(this)
    }
    showFixHead() {
        this.setState({
            onFixHead: !this.state.onFixHead
        })
    }

    render() {
        const props = this.props

        // console.log('?????',this.state.onFixHead,'.,.',this.props.tableType)
        return (

            <div>
                <br />
                <span
                    style={{ float: 'left', fontSize: '26px', lineHeight: '30px' }}>
                    TableName: </span>
                <TableTitle initName={this.props.tableName} onNameChange={props.onNameChange} />
                <br />
                <br />
                <span style={{ fontSize: '24px' }}>Type:</span>
                <TableType
                    onTypeChange={props.onTypeChange}
                    tableType={props.tableType}
                /> {
                    this.props.tableType === 'fixing' ?
                        <FixHeadSwitch ON={this.state.onFixHead} showFixHead={this.showFixHead} /> : null
                }
                <br />
                <Button onClick={() => props.onAddClick(mainId++)} secondary id='addButton' value='新增单元' />
                <Button onClick={props.showGRule} primary id='addButton' value='全局规则' />
                <br />

                <table>
                    <thead>
                        {this.state.onFixHead ?
                            props.tableType === 'fixing' ?
                                <FixHead
                                    onFixHeadChange={props.onFixHeadChange}
                                    fixHead={props.fixHead}
                                    maxDepth={props.maxDepth} />
                                : null
                            : null
                        }
                    </thead>
                    <TheadRen
                        onHeadClick={props.onHeadClick}
                        onDataClick={props.onDataClick}
                        vhead={props.headBlock} />
                </table>
            </div>
        )
    }
}
export class TableTitle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.initName
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        // this.setState({
        //     name: event.target.value
        // });
        this.props.onNameChange(event.target.value)
    }
    // render() {
    //     return <input style={{ float: 'left' }} value={this.props.initName} onChange={(event) => { this.props.onNameChange(event.target.value) }} />
    // }
    render() {
        return <TextField hintText='tableName here' onChange={this.handleChange}
            defaultValue={this.props.initName}
        />
    }
}
class TableType extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        //default type is floating, check the reduces
        this.props.onTypeChange(event.target.value)
    }
    render() {
        return <RadioButtonGroup key={this.props.tableType}
            name="type"
            onChange={this.handleChange}
            defaultSelected={this.props.tableType}>

            <RadioButton
                value="floating"
                label="Floating"
            />
            <RadioButton style={{
                marginTop: '-30px',
                marginLeft: '8em'
            }}
                value="fixing"
                label="Fixing"
            />
        </RadioButtonGroup>
    }
}

class FixHead extends React.Component {

    render() {
        const props = this.props
        const fixHead = props.fixHead || ['', '']
        // console.log('width', fixHead)
        return fixHead ? <tr>
            <th colSpan={props.maxDepth} >
                <TextField id='fixhead_0' onChange={
                    (event) => {
                        return props.onFixHeadChange(0, event.target.value)
                    }
                }
                    value={fixHead[0]}
                />
            </th>
            <th>
                <TextField id='fixhead_1' onChange={(event) => props.onFixHeadChange(1, event.target.value)}
                    value={fixHead[1]}
                />
            </th>
        </tr> : null
    }
}
class FixHeadSwitch extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange() {
        this.props.showFixHead()
    }
    render() {
        return <Toggle onToggle={this.handleChange}
            label='FixHead: '
            defaultToggled={this.props.ON}
            style={{
                marginLeft: '1em',
                maxWidth: '40px'
            }}
        />
    }
}


