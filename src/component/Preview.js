import React from 'react'
// import PropTypes from 'prop-types'
import { Button } from './Widget'
import { TheadRen } from './TableRen'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';

let mainId = 0;
export class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onFixHead: false
        }
        this.showFixHead = this.showFixHead.bind(this)
    }
    showFixHead() {
        this.setState({
            onFixHead: !this.state.onFixHead
        })
        console.log(this.state.onFixHead)
    }
    render() {
        const props = this.props
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
                <br />

                <table>
                    <thead>
                        {this.state.onFixHead ?
                            props.tableType === 'fixing' ?
                                <FixHead
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
        this.setState({
            name: event.target.value
        });
        this.props.onNameChange(event.target.value)
    }
    render() {
        return <input style={{ float: 'left' }} value={this.state.name} onChange={this.handleChange} />
    }
}
class TableType extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        console.log('/??', this.props);
    }

    handleChange(event) {
        // console.log(event.target.value)

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
        console.log('width', this.props.fixHead)
        return props.fixHead ? <tr>
            <th colSpan={props.maxDepth}>{props.fixHead[0]}</th>
            <th>{props.fixHead[1]}</th>
        </tr> : null
    }
}
let iid = 0;
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


