import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './Widget'
import { TheadRen } from './TableRen'
let mainId = 0;
export class Preview extends React.Component {
    render() {
        const props = this.props
        return (
            <div>
                <span 
                style={{float:'left',fontSize:'26px',lineHeight:'30px'}}>
                TableName: </span>
                <TableTitle initName={this.props.tableName} onNameChange={props.onNameChange} />
                <br/>
                <br/>
                <Button onClick={() => props.onAddClick(mainId++)} id='addButton' value='新增单元' />
                <br />
                <br />
                <br />
                <table>
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
        return <input style={{float:'left'}} value={this.state.name} onChange={this.handleChange} />
    }
}