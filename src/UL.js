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
                {this.state.result.map(e=><li> <Button value={e}/></li>)}
            </ul>
        )
    }
}
export default UL
