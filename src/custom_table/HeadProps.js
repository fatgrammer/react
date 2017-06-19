import React from 'react'
import { store } from './TableApp'
export class PropBar extends React.Component {
    render() {
        return (
            <div>
                <input placeholder='Head Name' />
                <button onClick={() => store.dispatch({
                    type: 'ADD_SECOND'
                })}>Add</button>
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
                <PropBar />
                {/*<div>
                    {this.props.level}<input placeholder='Head Name' />
                    <button onClick={() => store.dispatch({
                        type: 'ADD_SECOND'
                    })}>Add</button>
                    <button>Del</button>
                </div>*/}
            </div>
        )
    }
}