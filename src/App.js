import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { Navbar } from './components'
import {
  home,
  Login,
  Signup
} from './pages'
import './App.css'
import themeFile from './util/theme.js'
import AuthRoute from './util/AuthRoute'
import jwtDecode from 'jwt-decode'

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken
let authenticated
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp*1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
  console.log(decodedToken)
}

export default props => (
  <ThemeProvider theme={theme}>
    <div className='App' >
      <Router>
        <Navbar />
        <div className='container' >
          <Switch>
            <Route exact path='/' component={home} />
            <Route
              exact path='/login'
              children = { props => authenticated
                  ? <Redirect to='/' />
                  : <Login {...props} />
              }
            />
            <Route
              exact path='/signup'
              children = { props => authenticated
                  ? <Redirect to='/' />
                  : <Signup {...props} />
              }
            />
          </Switch>
        </div>
      </Router>
    </div>
  </ThemeProvider>
)
