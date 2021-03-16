import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';

//makes route private and only accessible by the owner/user, if not the owner/user redirect to login page
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    >

    </Route>
  )
}

export default PrivateRoute;