import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Button } from './Widget'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
const tokenize = (idf) => {
    switch (idf.eleType) {
        case 'operator':
            return { 'operator': idf.element }
        case 'fieldElement':
            return {
                [idf.element]: 0
            }
        default:
            return
    }
}
export class SimpleRen extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }
    componentWillMount() {
        let pak = []
        this.props.globalRule.slice(2).
            map(ele => pak = [...pak, tokenize(ele)])
        //redux state
        this.props.saveCalcData(pak)
    }
    handleChange(event, field) {
        if (this.props.calcData.filter(ele => Object.keys(ele)[0] === field).length === 0) { console.log('undefined'); return }
        //redux state
        this.props.saveCalcData(
            this.props.calcData.map(ele => {
                if (Object.keys(ele)[0] !== field) {
                    return ele
                }
                return { [field]: event.target.value || 0 }
            })
        );

    }
    render() {
        console.log("rule data", this.props.tableRule)
        console.log("global rule", this.props.globalRule)
        console.log('headsAata', this.props.headsData)
        console.log('rawheaeds', this.props.rawData)
        console.log('calcMap', this.props.calcData)
        const fieldPak = this.props.rawData.fieldList
        const fieldList = Object.keys(fieldPak)
        let stub = -1;
        if (this.props.globalRule.length > 2) {
            if (this.props.globalRule[1].element === '=') {
                stub = this.props.globalRule[0].element
            }
        }
        const CDPak = {}
        this.props.tableRule.
            forEach(ele => {
                CDPak[[ele.fieldId]] = ele.select
            })
        let trid = 0;
        const headsList = this.props.headsData.headsList
        const type = this.props.headsData.tableType
        const globalRule = this.props.globalRule
        const fieldEles = globalRule.slice(2).filter(ele => ele.eleType === 'fieldElement')
        const expression = globalRule.slice(2).map(ele => ele.element);

        let tokens = []
        let conf = {}

        this.props.tableRule.forEach(ele => conf = {
            ...conf, [ele.fieldId]: ele.select
        })
        
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
                , ...headsList.map((heads, idx) => {
                    return <tr key={heads[0].headField}>
                        {heads.map(head => {
                            return <th key={head.headField}
                                colSpan={head.colSpan}
                                rowSpan={head.rowSpan}>
                                {head.headField}
                            </th>
                        })}
                        {   conf[fieldList[idx]] !== undefined ? 
                            iType({
                                type:'ConstRef',
                                conf:conf[fieldList[idx]]
                            }): 
                            typeFilter(
                            () => stub === -1,
                            { id: heads[0].headField }) || (
                                fieldList[idx] === stub ?
                                    <td>{this.props.calcTotal}</td> :
                                    iType({
                                        type: 'AutoCalc',
                                        onChange: (event) => this.handleChange(event, fieldList[idx]),
                                        id: heads[0].headField
                                    }))}
                    </tr >
                })]
        return <thead>
            {tableForm}
        </thead>
    }
}
const typeFilter = (predicate, metaData) => {
    return predicate() ? <td>
        <TextField {...metaData} />
    </td> : undefined
}
const iType = (info) => {
    switch (info.type) {
        case 'AutoCalc':
            return <td>
                <TextField {...info} />
            </td>
        case 'ConstRef':
        console.log('wwasdasdasds',info.conf)
            return <td>
                <SelectField >
                    {info.conf.map(ele=>
                        <MenuItem value={ele} label={ele} primaryText={ele}/>
                    )}
                </SelectField>
            </td>
        default:
            return
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



