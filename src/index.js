import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render((<Router >
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('head'));

// import actionCreator from './Act'
// import registerServiceWorker from './registerServiceWorker';
// import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
