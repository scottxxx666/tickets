import React from 'react';
import TicketList from './components/ticket/TicketList';
import {HashRouter, Route, Switch} from 'react-router-dom';
import TicketCreate from './components/ticket/TicketCreate';
import Login from './components/auth/Login';
import dotenv from 'dotenv';
import AuthContextProvider from './components/auth/AuthContextProvider';
import AppTopBar from './components/layout/AppTopBar';
import ScrollTop from './components/layout/ScrollTop';
import PrivateRoute from './PrivateRoute';
import ApolloProvider from './ApolloProvider';
import TicketUpdate from './components/ticket/TicketUpdate';

export default () => {
  dotenv.config();

  return (
    <AuthContextProvider>
      <ApolloProvider>
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
              <PrivateRoute path="/event/:eventId/tickets/:ticketId">
                <TicketUpdate/>
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
      </ApolloProvider>
    </AuthContextProvider>
  );
};

