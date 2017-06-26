import React, { Component } from 'react';

import { actions } from './custom_table/TableApp'

// import PropTypes from 'prop-types'

import { CSSTransitionGroup } from 'react-transition-group'
import './global.css'
export let globalBarKey = 0
export class TheadRen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: [],
            second: []
        }
    }

    renderHorizontalThead(headsList = []) {
        return Object.values(headsList).map(heads => {
            return <tr>{Object.values(heads).map(head => {
                return <th colSpan={head.colSpan} rowSpan={head.rowSpan}>{head.headField}</th>
            })}</tr>
        })
    }
    renderVerticalHeads(headsList = []) {
        return Object.values(headsList).map(heads => {
            return <tr>{Object.values(heads).map(head => {
                return <th colSpan={head.rowSpan}>{head.headField}</th>
            })
            }<td>content</td></tr >
        })
    }
    renderHeadPak(headPakList = []) {
        let gIdx = -1;
        return headPakList.map(headPak => {
            gIdx += 1;
            return headPak.data.map(heads => {
                return <tr>{heads.map(head => {
                    return <Th key={globalBarKey++} id={gIdx} prefix={head.prefix}
                        //          onHeadClick={
                        //            actions('INS', {
                        //              id: gIdx,
                        //            prefix: head.prefix
                        //      })}
                        onHeadClick={
                            actions('POP', {
                                id: gIdx
                            })
                        }
                        rowSpan={head.colSpan} colSpan={head.rowSpan}>{head.head}</Th>
                })
                }<td>hazard</td></tr >
            })
        })
    }
    render() {
        return (
            <thead>
                {this.renderHorizontalThead(this.props.hhead)}{this.renderHeadPak(this.props.vhead)}
            </thead>
        )
    }
}

export class Th extends React.Component {
    render() {
        return <th onClick={this.props.onHeadClick} rowSpan={this.props.rowSpan} colSpan={this.props.colSpan} > {this.props.children}</th>
    }
}
export class TbodyRen extends Component {
    renderTbody(length = 0) {
        let ret = new Array(length)
        ret.fill(<td>content</td>)
        return ret;
    }
    render() {
        return (
            <tbody><tr>{this.renderTbody(this.props.length)}</tr></tbody>
        )
    }
}



