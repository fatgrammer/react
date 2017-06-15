import React, { Component } from 'react';
// let Thead = require("./Thead.js")
import Thead from './Thead'
import Tbody from './Tbody'


const tableStyleList = "table table-bordered table-hover table-condensed"

class EdiTable extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <table className="item table-bordered table-hover">
                    <Thead content={this.props.thead}/>
                    <Tbody content={this.props.tbody}/>
            </table>
        )
    }
}



export default EdiTable