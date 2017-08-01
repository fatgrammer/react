import React from 'react'
import { Button } from './Widget'
// import { CSSTransitionGroup } from 'react-transition-group'
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List';

export class ConstRefBox extends React.Component {
    componentDidMount() {
        this.props.getHeads(this.props.tableName)
        this.props.getCRefData(this.props.tableName)
    }
    render() {
        const props = this.props

        return <div>
            <h2>{props.tableName}</h2>
            {/* <ul>
                {props.fieldList &&
                    Object.entries(props.fieldList).map(
                        field => <li key={field}>{field[0] + '-------' + field[1]}</li>
                    )}
            </ul> */}
            <List>
                {!this.props.cRefData ||
                    this.props.cRefData.reference.
                        map(ele => Object.entries(ele)[0]).
                        map(ele =>
                            <ListItem key={ele[0]} 
                                primaryText={ele[1][0]}
                                nestedItems={[...ele[1][1].map(
                                    e => <ListItem key={e} primaryText={e} />
                                )]}
                            />
                        )
                }

            </List>

            {/* <ul>
                {!this.props.cRefData ||
                    this.props.cRefData.reference.map(ele => Object.entries(ele)[0]).
                        map(ele => {
                            return < li key={ele[0]} >
                                {ele[1][0]}
                                <ul>
                                    {ele[1][1].map(e =>
                                        <li key={e}>
                                            {e}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        })}
            </ul> */}

        </div>
    }
}