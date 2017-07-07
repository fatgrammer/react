import ReactDOM from 'react-dom';
import React from 'react'
import { Provider } from 'react-redux'
// import TableApp from './custom_table/TableApp'
import { App } from './component/App'
import { Link } from 'react-router-dom'
import { Route, Router } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory';

import { reducers } from './reducer/reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'


export const store = createStore(combineReducers({
    ...reducers,
    routing: routerReducer
})
)

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store)

// import './common.css'
const Home = () => (
    <div>
        <h1>Home</h1>
        <Link to='/app'>Table</Link>
    </div>
)


// ReactDOM.render(
//     <Provider store={store} >
//         <Router history={history}>
//             <div>
//                 <Route exact path='/' component={Home} />
//                 <Route path='/app' component={App} />
//             </div>
//         </Router>
//     </Provider>,
//     document.getElementById("root"))

ReactDOM.render(
    < Provider store={store} >
        <App />
    </Provider >,
    document.getElementById("root"))
