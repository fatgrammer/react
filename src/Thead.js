import React, { Component } from 'react';

export class TheadRen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: [],
            second: []
        }
    }

    renderThead(headsList) {
        return Object.values(headsList).map(heads => {
            return <tr>{Object.values(heads).map(head => {
                return <th colSpan={head.colSpan} rowSpan={head.rowSpan}>{head.headField}</th>
            })}</tr>
        })

    }
    render() {
        return (
            <thead>{this.renderThead(this.props.content)}</thead>

        )
    }
}



