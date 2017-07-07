import ReactDOM from 'react-dom';
import React from 'react'

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { App } from './component/App'

import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import { reducers } from './reducer/reducers'

import { Homepage } from './component/Homepage'

const history = createHistory()
const middleware = routerMiddleware(history)
export const store = createStore(combineReducers({
    ...reducers,
    routing: routerReducer
}),
    applyMiddleware(middleware)
)




ReactDOM.render(
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <div>
                <Route exact path='/' component={Homepage} />
                <Route path='/newTable' component={App} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root"))


