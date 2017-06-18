// import React from 'react';
import ReactDOM from 'react-dom';
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
// import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import TodoApp from './components/TodoApp'

// let store = createStore(todoApp)

// render(
//   <Provider store={store}>
//     <TodoApp />
//   </Provider>,
//   document.getElementById('root')
// )
// import BigButton from './exp/ReduxEx'
import FetchData from './FetchData'
import BigButton from './exp/ReduxEx'
import { combineReducers } from 'redux'
import $ from 'jquery'
import 'whatwg-fetch'
const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

function getJSON(url) {
  'use strict';
  var xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.responseText);
        }
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
}

const makeRequest = async()=>{
    // console.log(await fetch("temp.json"))
    console.log(await getJSON("temp.json"))
}
makeRequest();
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
// document.addEventListener('click', () => {
//     store.dispatch({ type: 'INCREMENT' });
// });



const pop = (state = [], action) => {
    switch (action.type) {
        case 'POP':
            return 999;
        default:
            return state;
    }
}
const todo = combineReducers({
    counter: counter,
    pop: pop
})


const store = createStore(todo)
const ren = () => {
    ReactDOM.render(
        <BigButton value={store.getState().pop}
            onIncrement={() =>
                store.dispatch({
                    type: 'INCREMENT'
                })}
            onDecrement={() =>
                store.dispatch({
                    type: 'DECREMENT'
                })}
            onPop={() =>
                store.dispatch({
                    type: 'POP'
                })}
        />,
        document.getElementById("root"))
}
store.subscribe(ren);
ren();