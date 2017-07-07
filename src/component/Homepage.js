import React from 'react'
import { Link } from 'react-router-dom'
import { TableCategory } from '../containers/TableCategory'
const buttonStyle = {
    float: 'left',
    fontSize: '26px',
    lineHeight: '30px',
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'fantasy'
}
export const Homepage = () => (
    <div>
        <h1>Home</h1>
        <Link to='/newTable'>
            <span style={buttonStyle}>
                newTable
               </span>
        </Link>
        <TableCategory />
    </div>
)