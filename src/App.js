import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Navbar } from './components'
import {
  home,
  login,
  signup
} from './pages'
import './App.css'

export default class extends Component {
  render() {
    return (
      <div className='App' >
        <Router>
          <Navbar />
          <div className='container' >
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/login' component={login} />
              <Route exact path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
