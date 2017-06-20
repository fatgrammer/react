import React from 'react'
import { store } from './TableApp'
export class PropBar extends React.Component {
    // () => store.dispatch({
    //                 type: 'ADD_SECOND',
    //                 id: this.props.id 
    //             })
    render(){
        return (
            <div>
                {this.props.level}<input placeholder='Head Name' />
                <button onClick={this.props.dispatcher} >Add</button>
                <button>Del</button>
            </div>
        )
    }
}
export class HeadProps extends React.Component {

    render() {
        return (
            <div >
                <h1>Head props</h1>
                {this.props.bars}
            </div>
        )
    }
}