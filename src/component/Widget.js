import React from 'react'
export class Button extends React.Component {
    render() {
        return (
            <div id={this.props.id} onClick={this.props.onClick}>
                {this.props.glyphicon}{this.props.value}
            </div>
        )
    }
}