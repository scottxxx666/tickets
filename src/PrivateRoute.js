import React, {useContext} from 'react';
import AuthContext from './AuthContext';
import {Redirect, Route} from 'react-router-dom';

export default (props) => {
  const auth = useContext(AuthContext);

  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLogin() ? (children) : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      }
    />
  );
}

