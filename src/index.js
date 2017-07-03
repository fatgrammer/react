import ReactDOM from 'react-dom';
import React from 'react'
import { Provider } from 'react-redux'
import TableApp from './custom_table/TableApp'
import { store } from './custom_table/TableApp'
// import './common.css'
const ren = () => {
    ReactDOM.render(
        <Provider store={store} >
            <TableApp  />
        </Provider>,
        document.getElementById("root"))
}
store.subscribe(ren);
ren();



