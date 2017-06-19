import ReactDOM from 'react-dom';
import React from 'react'
// import { Provider } from 'react-redux'
// import { createStore, combineReducers } from 'redux'
// import $ from 'jquery'
// import EdiTable from './EdiTable'
// import { cellPairApp } from './reducer/reducers'
import TableApp from './custom_table/TableApp'
// import { CellPairs } from './reducer/reducers'
import {store} from './custom_table/TableApp'
// ReactDOM.render(<EdiTable thead={$.getJSON("http://localhost:20080/floatingHead/3-9")} />, document.getElementById('root'));
// ReactDOM.render(<TableApp store={store} />, document.getElementById("root"))
const ren = () => {
    ReactDOM.render(<TableApp cells = {store.getState().cellPairs}/>, document.getElementById("root"))
}
store.subscribe(ren);
ren();

