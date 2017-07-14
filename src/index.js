import ReactDOM from 'react-dom';
import React from 'react'

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { App } from './component/App'
import { FillApp } from './component/FillApp'
import { ConstRefApp } from './component/ConstRefApp'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import { reducers } from './reducer/reducers'

import { Homepage } from './component/Homepage'

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const history = createHistory()
const middleware = routerMiddleware(history)
export const store = createStore(combineReducers({
    ...reducers,
    routing: routerReducer
}),
    applyMiddleware(middleware)
)


store.dispatch(push('/'))


ReactDOM.render(
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <div>
                <Route exact path='/' component={Homepage} />
                <Route path='/newTable' component={App} />
                <Route path='/fill' component={FillApp} />
                <Route path='/constRef' component={ConstRefApp} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root"))


