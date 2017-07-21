import React from 'react'

import { CSSTransitionGroup } from 'react-transition-group'
export class SlideFX extends React.Component {
    render() {
        return <CSSTransitionGroup
            transitionName="background"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
            component='div'
        >{this.props.children}
        </CSSTransitionGroup>
    }
}