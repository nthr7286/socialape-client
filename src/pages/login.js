import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress 
from '@material-ui/core/CircularProgress'

import AppIcon from '../images/icon.png'

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto',
  },
  pageTitle: {
    margin: '10px auto'
  },
  textField: {
    margin: '10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
  },
  progress: {
    position: 'absolute'
  }
}))

export default props => {
  const classes = useStyles()
  const initialState = {
    email: '',
    password: '',
    loading: false,
    errors: {},
  }
  const [state, setState] = useState(initialState)

  const handleSubmit = e => {
    e.preventDefault()
    setState({
      ...state,
      loading: true
    })
    const userData = {
      email: state.email,
      password: state.password
    }
    axios.post('./login', userData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem(
          'FBIdToken', `Bearer ${res.data.token}`
        )
        setState({
          ...state,
          loading: false
        })
        console.log(props)
        props.history.push('/')
      })
      .catch(err => {
        setState({
          ...state,
          errors: err.response.data,
          loading: false,
        })
      })
  }
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img
          src={AppIcon}
          alt="monkey"
          className={classes.image}
        />
        <Typography
          variant="h2"
          className={classes.pageTitle}
          children="Login"
        />
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={state.errors.email}
            error={state.errors.email ? true : false}
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={state.errors.password}
            error={state.errors.password ? true : false}
            value={state.password}
            onChange={handleChange}
            fullWidth
          />
          { state.errors.general && (
              < Typography
                variant="body2"
                className={classes.customError}
                children={state.errors.general}
              />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={state.loading}
          >
            Login
            { state.loading && (
              <CircularProgress
                className={classes.progress}
                size={30}
              />
            )}
          </Button>
          <br />
          <small>
            dont have an acount ? sign up 
            <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}
