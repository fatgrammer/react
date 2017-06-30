import React, { Component } from 'react';
// let Thead = require("./Thead.js")
import { TheadRen, TbodyRen } from './TableRen'
import Tbody from './Tbody'
import {Table} from 'react-bootstrap/lib';


const tableStyleList = "table table-bordered table-hover table-condensed"

class EdiTable extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         thead:[]
    //     }
    // }
    // componentWillMount() {
    //     this.props.thead.then(json => {
    //         this.setState({
    //             thead: json
    //         })
    //     })
    // }

    render() {
        return (
            <table  >
                {/*<RenHead content={this.props.thead} />*/}
                <TheadRen vhead={this.props.vhead} />
                {/*<TheadRen hhead={this.props.hhead} />*/}
                {/*<TbodyRen length={this.props.bodyLength} />*/}
                {/*<Tbody content={this.state.tbody} />*/}
            </table>
        )
    }
}
// const RenHead = (content) => {
//     return content.content.map(bigCell =>
//         <tr>
//             {cells.map(cell => <th>{cell}</th>)}
//         </tr>
//     )
// }





export default EdiTable