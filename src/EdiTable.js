import React, { Component } from 'react';
// let Thead = require("./Thead.js")
import {TheadRen} from './Thead'
import Tbody from './Tbody'


// const tableStyleList = "table table-bordered table-hover table-condensed"

class EdiTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            thead:[]
        }
    }
    componentWillMount() {
        this.props.thead.then(json => {
            this.setState({
                thead: json
            })
        })
    }

    render() {
        return (
            <table className="item table-bordered table-hover">
                <TheadRen content={this.state.thead} />
                {/*<Tbody content={this.state.tbody} />*/}
            </table>
        )
    }
}



export default EdiTable