import React from 'react'
// import { Link } from 'react-router-dom'
import { TableCategory } from '../containers/TableCategory'
import { FillCategory } from '../containers/FillCategory'
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
        <span style={{
            float: 'left'
        }}>
            <h1>Home</h1>
            <h2>Custom Table</h2>
            <TableCategory />
        </span>
        <span style={{
            float: 'left',
            marginTop: '4em',
            marginLeft: '2em'
        }}>
            <h2>FillData</h2>
            <FillCategory />
        </span>
    </div>
)
