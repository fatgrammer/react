import React from 'react'
import {store} from './TableApp'
export  class CellPair extends React.Component {
    componentDidMount(){
        console.log("key is", this.props.id)
    }
    render() {
        return (
            <tr ><th onClick={()=>store.dispatch({
                    type:'POP_STRUCTURE',
                    id: this.props.id
                })}>head</th><td>body</td></tr>
        )
    }
}