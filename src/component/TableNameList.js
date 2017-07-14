
import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'


const buttonStyle = {
    float: 'left',
    fontSize: '26px',
    lineHeight: '30px',
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'fantasy'
}

export class TableNameList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableList: []
        }
    }
    componentDidMount() {
        $.getJSON('http://192.168.1.249:20080/tableList', (ret) => {
            this.setState({
                tableList: ret
            })
        })
    }
    render() {
        const props = this.props
        return <div>
            <h3>TableName List</h3>
            <ul>

                {this.state.tableList.map(tableName => {
                    return <li key={tableName}><Link
                        onClick={() => props.tableName(tableName)}
                        style={buttonStyle} to={this.props.destination}>
                        {tableName}
                    </Link></li>
                })}
            </ul>
        </div>
    }
}