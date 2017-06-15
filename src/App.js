import React, { Component } from 'react';
import logo from './cat.png';
import './App.css';
import Fetch from './FetchData'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>System</h1>
        </div>
        <Fetch hUrl="flt.json" bUrl="http://localhost:20080/floatingData" />
      </div>

    );
  }
}

export default App;
