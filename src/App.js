import React from 'react';
import TicketList from './TicketList';
import {HashRouter, Route, Switch} from 'react-router-dom';
import TicketCreate from './TicketCreate';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Login from './Login';
import dotenv from 'dotenv';
import AuthContextProvider from './AuthContextProvider';

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
            <Switch>
              <Route path="/about">
                Hi
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/event/:eventId/tickets/create">
                <TicketCreate/>
              </Route>
              <Route path="/event/:eventId/tickets">
                <TicketList/>
              </Route>
              <Route path="/">
                index
              </Route>
            </Switch>
          </div>
        </HashRouter>
      </AuthContextProvider>
    </ApolloProvider>
  );
};

