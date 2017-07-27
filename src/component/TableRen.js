import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Button } from './Widget'

export let globalHeadId = 0
export class TheadRen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: [],
            second: []
        }
    }


    renderHeadPak(headPakList = []) {
        let gIdx = -1;
        let LocalBarKey = 0;
        const props = this.props
        return headPakList.map(headPak => {
            gIdx += 1;
            return headPak.data.map(heads => {
                return <tr>{heads.map(head => {
                    return <Th key={LocalBarKey++} id={gIdx} prefix={head.prefix}
                        onHeadClick={
                            () => props.onHeadClick(headPak.id)
                        }
                        rowSpan={head.width} colSpan={head.depth}>
                        seq:{head.head} val:{head.value}
                    </Th>
                })
                }<Td onDataClick={() =>
                    props.onDataClick(
                        heads[heads.length - 1].head,
                        heads[heads.length - 1].value
                    )
                }
                >hazard</Td></tr >
            })
        })
    }
    render() {
        return (
            <thead>
                {this.renderHeadPak(this.props.vhead)}
            </thead>
        )
    }
}
export class SimpleRen extends React.Component {
    render() {
        let trid = 0;
        const headsList = this.props.headsData.headsList
        const type = this.props.headsData.tableType
        // const pList = headsList.filter(heads=>heads)
        console.log("ffff?",type);
        const tableForm = type === 'floating' ?
            headsList.map(heads => {
                return <tr>{Object.values(heads).map(head => {
                    return <th colSpan={head.colSpan} rowSpan={head.rowSpan}>
                        {head.headField}
                    </th>
                })}</tr>
            })
            : [
                <tr key={trid++}>
                    {this.props.headsData.fixHead ?
                        this.props.headsData.fixHead.map(
                            ele => <th key={ele.headField} rowSpan={ele.rowSpan}
                                colSpan={ele.colSpan}>
                                {ele.headField}
                            </th>
                        ) : null}
                </tr>
                , ...headsList.map(heads => {
                    return <tr key={heads[0].headField}>
                        {heads.map(head => {
                            return <th key={head.headField}
                                colSpan={head.colSpan}
                                rowSpan={head.rowSpan}>
                                {head.headField}
                            </th>
                        })}
                        {<td><TextField id={heads[0].headField} value='content' /></td>}
                    </tr >
                })]
        console.log("type is ", type)
        return <thead>
            {tableForm}
        </thead>


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
// export class TbodyRen extends Component {
//     renderTbody(length = 0) {
//         let ret = new Array(length)
//         ret.fill(<td>content</td>)
//         return ret;
//     }
//     render() {
//         return (
//             <tbody><tr>{this.renderTbody(this.props.length)}</tr></tbody>
//         )
//     }
// }



