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
import BigButton from './exp/ReduxEx'

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
const store = createStore(counter)
// document.addEventListener('click', () => {
//     store.dispatch({ type: 'INCREMENT' });
// });


const ren = ()=>{
ReactDOM.render(
    <BigButton value={store.getState()}
        onIncrement={() =>
            store.dispatch({
                type: 'INCREMENT'
            })}
        onDecrement={() =>
            store.dispatch({
                type: 'DECREMENT'
            })}
    />,
    document.getElementById("root"))
}
store.subscribe(ren);
ren();