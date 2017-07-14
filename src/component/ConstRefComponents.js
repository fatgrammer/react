import React from 'react'
import { Button } from './Widget'
// import { CSSTransitionGroup } from 'react-transition-group'

export class ConstRefBox extends React.Component {
    componentDidMount() {
        this.props.getHeads(this.props.tableName)
    }
    render() {
        console.log(this.props.fieldList)
        const props = this.props
        return <div>
            <h2>{props.tableName}</h2>
            <ul>
                {props.fieldList &&
                    Object.entries(props.fieldList).map(
                        field => <li key={field}>{field}</li>
                    )}
            </ul>

        </div>
    }
}