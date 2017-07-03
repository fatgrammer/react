import React, { Component } from 'react';
import { actions } from './custom_table/TableApp'

// import PropTypes from 'prop-types'
// import { CSSTransitionGroup } from 'react-transition-group'
import './global.css'
export let globalHeadId = 0
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
        let LocalBarKey = 0;
        return headPakList.map(headPak => {
            gIdx += 1;
            return headPak.data.map(heads => {
                return <tr>{heads.map(head => {
                    return <Th key={LocalBarKey++} id={gIdx} prefix={head.prefix}
                        onHeadClick={
                            actions('POP', {
                                id: headPak.id
                            })
                        }
                        rowSpan={head.width} colSpan={head.depth}>
                        seq:{head.head} val:{head.value}
                    </Th>
                })
                }<Td onDataClick={
                    actions('RULE', {
                        id: heads[heads.length - 1].value,
                    })
                }

                >hazard</Td></tr >
            })
        })
    }
    render() {
        return (
            // <CSSTransitionGroup
            //     transitionName='example'
            //     transitionEnterTimeout={500}
            //     transitionLeaveTimeout={300}
            //     component='thead'
            // >
            <thead>
                {this.renderHorizontalThead(this.props.hhead)}{this.renderHeadPak(this.props.vhead)}
            </thead>
            // </CSSTransitionGroup>
        )
    }
}

export class Th extends React.Component {
    render() {
        return <th onClick={this.props.onHeadClick} rowSpan={this.props.rowSpan} colSpan={this.props.colSpan} > {this.props.children}</th>
    }
}
export class Td extends React.Component {

    render() {
        return <td onClick={this.props.onDataClick} >{this.props.children}</td>
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



