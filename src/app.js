import React from 'react'
import { Homepage } from './homepage.js'
import { Flashing } from './flashing.js'
import { Route} from 'react-router-dom'
export class App extends React.Component {
  render() {
    return <div>
      <Route exact path="/" component={Homepage} />
      <Route exact path='/flashing' component={Flashing} />
    </div>
  }
}