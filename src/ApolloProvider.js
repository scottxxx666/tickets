import {ApolloProvider} from '@apollo/react-hooks';
import React, {useContext} from 'react';
import AuthContext from './AuthContext';
import ApolloClient from 'apollo-boost';

function createConfigs(auth) {
  const configs = {
    uri: 'http://localhost:4000/',
  };
  if (auth.isLogin()) {
    configs.headers = {
      authorization: `Bearer ${auth.getToken()}`,
    };
  }
  return configs;
}

export default (props) => {
  const auth = useContext(AuthContext);
  const client = new ApolloClient(createConfigs(auth));

  return (
    <ApolloProvider client={client} {...props}/>
  );
}
