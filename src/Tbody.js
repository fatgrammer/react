import React, { Component } from 'react';
import './table.css';
class Tbody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    jToTrA(json){
        return Object.values(json).map((obj, index) => <tr key={index}>{this.tdize(obj)}</tr>)
   }
    tdize(obj) {
         return  Object.values(obj)
            .map((value, index) => <td  key={index}>{value}</td>)
    }
    render() {
        return (
            <tbody suppressContentEditableWarning={true} contentEditable>{this.jToTrA(this.props.content)}</tbody>
        )
    }
}


class TrTd extends Component {
    renderData() {
        return (
            <tr>
                {this.props.content.map((data, index) => <td key={index}>{data}</td>)}
            </tr>)
    }
    render() {
        return this.renderData()

    }
}


export default Tbody