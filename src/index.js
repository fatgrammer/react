// import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
// import Category from './Category'

// import actionCreator from './Act'
// import registerServiceWorker from './registerServiceWorker';
// import './index.css';

// import { createStore } from 'redux'
// import todoApp from './reducers'

// let store = createStore(todoApp)




import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import TodoApp from './components/TodoApp'
// import './exp/Ex.js'
// let store = createStore(todoApp)

// const ren = ()=>{
//   ReactDOM.render(

//     <Provider store={store}>
//       <TodoApp />
//     </Provider>,
//     document.getElementById('root')
//   )
// }
// store.subscribe(ren)
// ren();
ReactDOM.render(<App />, document.getElementById('root'));