import React from 'react';
import TicketList from './TicketList';
import {HashRouter, Route, Switch} from 'react-router-dom';
import TicketCreate from './TicketCreate';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Login from './Login';

export default () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
  });

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

