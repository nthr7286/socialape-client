import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

export default props => {
  const {component, authenticated, ...rest} = props
  const Component = component
  console.log(rest)
  return (
    <div
      // {...rest}
      // children={ 
      //   authenticated
      //     ? null //<Redirect to='/' />
      //     : null //<Component />
      // }
    />
  )
}
