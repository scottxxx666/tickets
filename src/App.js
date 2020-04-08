import React from 'react';
import TicketList from './TicketList';
import {HashRouter, Route, Switch} from 'react-router-dom';
import TicketCreate from './TicketCreate';
import Login from './Login';
import dotenv from 'dotenv';
import AuthContextProvider from './AuthContextProvider';
import AppTopBar from './AppTopBar';
import ScrollTop from './ScrollTop';
import PrivateRoute from './PrivateRoute';
import ApolloProvider from './ApolloProvider';
import TicketUpdate from './TicketUpdate';

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

