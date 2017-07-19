import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

export class Button extends React.Component {
    render() {
        return (
            <RaisedButton primary={this.props.primary}
                style={{
                    margin: 10,
                    minWidth: '2em'
                }}
                secondary={this.props.secondary} label={this.props.value}
                onClick={this.props.onClick} />

        )
    }
}
export class RedX extends React.Component {
    render() {
        return <div id='closeX' {...this.props} onClick={this.props.onClick}>{`\u00d7`}</div>
    }
}