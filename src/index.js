import ReactDOM from 'react-dom';
import React from 'react'
import { Provider,connect } from 'react-redux'
// import { createStore, combineReducers } from 'redux'
// import $ from 'jquery'
// import EdiTable from './EdiTable'
// import { cellPairApp } from './reducer/reducers'
import TableApp from './custom_table/TableApp'
// import { CellPairs } from './reducer/reducers'
import { store } from './custom_table/TableApp'
import './common.css'
// ReactDOM.render(<EdiTable thead={$.getJSON("http://localhost:20080/floatingHead/3-9")} />, document.getElementById('root'));
// ReactDOM.render(<TableApp store={store} />, document.getElementById("root"))

// class Provider extends React.Component {
//    getChildContext() {
//        return {
//            store:this.props.store
//        }
//    }
//     render() {
//         return this.props.children;
//     }
// }
// Provider.childContextTypes= {
//     store:React.PropTypes.object
// }
const ren = () => {
    ReactDOM.render(
        <Provider store={store} state={store.getState()} cells={store.getState().cellPairs}>
            <TableApp  />
        </Provider>,
        document.getElementById("root"))





}
store.subscribe(ren);
ren();



