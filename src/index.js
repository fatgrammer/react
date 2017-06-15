// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import Category from './Category'

// import actionCreator from './Act'
// import registerServiceWorker from './registerServiceWorker';
// import './index.css';

// import { createStore } from 'redux'
// import todoApp from './reducers'

// let store = createStore(todoApp)


// ReactDOM.render(<App />, document.getElementById('root'));


import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import TodoApp from './components/TodoApp'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)