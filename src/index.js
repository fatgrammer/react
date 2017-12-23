import ReactDOM from 'react-dom'
import React from 'react'
import { App } from './app.js'
// import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,
    document.getElementById("root")
)


