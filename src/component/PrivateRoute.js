import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export function PrivateRoute({ component: Component, check, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser && (!check || check(currentUser)) ? <Component {...props} /> : <Redirect to='/' />
      }}
    ></Route>
  )
}
