import React from 'react'
import { store } from './TableApp'
import PropTypes from 'prop-types'

export class PropBar extends React.Component {
    render() {
        let display = {}
        if (this.props.level === '__3rd') {
            display = {
                display: 'none',
            }
        }
        return (
            <div>
                {this.props.level}<input placeholder='Head Name' />
                <button style={display} onClick={this.props.onBarClick} >Add</button>
                <button onClick={this.props.deleteAction}>Del</button>
                {this.props.foos}
            </div>
        )
    }
}
export const HeadProps = ({ bars }) => {

    return (
        <div >
            <h1>Head props</h1>
            {bars}
        </div>
    )
}
