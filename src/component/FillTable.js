
import React from 'react'
import { SimpleRen } from './TableRen'
import $ from 'jquery'
export class FillTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headsData: ''
        }
    }
    componentDidMount() {
        $.getJSON('http://192.168.1.249:20080/floatingHead/' + this.props.tableName, (ret) => {
            console.log('ret', ret)
            this.setState({
                headsData: ret
            })
        })
    }
    render() {
        return <table><SimpleRen headsData={this.state.headsData} /></table>
    }
}