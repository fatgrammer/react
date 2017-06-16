import React, { Component } from 'react';
// let Thead = require("./Thead.js")
import Thead from './Thead'
import Tbody from './Tbody'


const tableStyleList = "table table-bordered table-hover table-condensed"

class EdiTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            thead: [],
            tbody: []
        }
    }
    componentDidMount() {
        this.props.pBody.then(json => {
            this.setState({
                tbody: json
            })
        })
        this.props.pHead.then(json => {
            this.setState({
                thead: json
            })
        })
    }
    render() {
        return (
            <table className="item table-bordered table-hover">
                <Thead content={this.state.thead} />
                {/*<Tbody content={this.state.tbody} />*/}
            </table>
        )
    }
}



export default EdiTable