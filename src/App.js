import React, {useContext} from 'react';
import TicketList from './TicketList';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import TicketCreate from './TicketCreate';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Login from './Login';
import dotenv from 'dotenv';
import AuthContextProvider from './AuthContextProvider';
import AuthContext from './AuthContext';
import AppTopBar from './AppTopBar';
import ScrollTop from './ScrollTop';

const PrivateRoute = (props) => {
  const auth = useContext(AuthContext);

  const { children, ...rest } = props;
  return (
    <Route {...rest}
           render={(props) =>
             auth.isLogin() ? (children) : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
           }
    />
  );
};

export default () => {
  dotenv.config();
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
  });

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <HashRouter>
          <div className="App">
            <AppTopBar/>
            <Switch>
              <Route path="/about">
                Hi
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <PrivateRoute path="/event/:eventId/tickets/create">
                <TicketCreate/>
              </PrivateRoute>
              <Route path="/event/:eventId/tickets">
                <TicketList/>
              </Route>
              <Route path="/">
                index
              </Route>
            </Switch>
          </div>
          <ScrollTop/>
        </HashRouter>
      </AuthContextProvider>
    </ApolloProvider>
  );
};

