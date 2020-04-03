import React, {useContext} from 'react';
import TicketList from './TicketList';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import TicketCreate from './TicketCreate';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Login from './Login';
import dotenv from 'dotenv';
import AuthContextProvider from './AuthContextProvider';
import AppTopBar from './AppTopBar';
import ScrollTop from './ScrollTop';
import PrivateRoute from './PrivateRoute';

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

