
import 'whatwg-fetch'
import React, { Component } from 'react';
import EdiTable from './EdiTable'
const tableStyleList = "table table-bordered table-hover"

class FetchData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tbody: "",
            thead: {}
        }
    }
    FetchData() {
        return this.getData(this, "result", this.props.url)
    }
    getData(e, target, url) {
        return fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json()
        }, function (error) {
            console.log(error.message)
        }).then(function (json) {
            e.setDataHelper(json, target);
            e.props = {
                result: json
            }
            return json
        })
    }
    setDataHelper(arr, target) {
        if (target === 'tbody') {
            this.setState({
                tbody: arr
            })
        } else if (target === 'thead') {
            this.setState({
                thead: arr
            })
        }
    }
    componentDidMount() {
        // this.getData(this, "tbody", this.props.bUrl)
        // this.getData(this, "thead", this.props.hUrl)

        this.getData(this, "result", this.props.url)

    }

    render() {
        return (
            <EdiTable thead={this.state.thead} tbody={this.state.tbody} />
            // <h1>{this.props.content}</h1>

        )
    }
}

export default FetchData 