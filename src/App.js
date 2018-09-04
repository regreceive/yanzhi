import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/home/'
import Upload from './pages/upload/'
import Result from './pages/result/'
import Group from './pages/group'

import './App.css'

class App extends Component {
  render() {
    return (
      <div styleName="root">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/result" component={Result} />
          <Route path="/group" component={Group} />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}

export default App
