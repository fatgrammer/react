import React, { Component } from 'react';
import Button from './Button'
class UL extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: []
        }
    }
    componentDidMount() {
        this.props.promise.then(json => {
            this.setState({
                result: json
            })
        })
    }
    render() {
        return (
            <ul>
                <li> <Button value={this.state.result}/></li>
            </ul>
        )
    }
}
export default UL
