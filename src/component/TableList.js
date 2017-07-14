import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { TableNameList } from './TableNameList'



export class TableList extends React.Component {

    render() {
        const props = this.props
        return <div>
            <ul>
                <Link
                    to='/newTable'>
                    <span onClick={() => {
                        props.tableName('')
                    }}
                    >
                        <h2 style={{ backgroundColor: 'wheat', color: 'red' }}>newTable</h2>
                    </span>
                </Link>
            </ul>
            <TableNameList tableName={props.tableName} destination={this.props.destination} />
        </div>
    }
}