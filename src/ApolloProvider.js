import {ApolloProvider} from '@apollo/react-hooks';
import React, {useContext} from 'react';
import AuthContext from './AuthContext';
import ApolloClient from 'apollo-boost';

export default (props) => {
  const auth = useContext(AuthContext);
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    headers: {
      authorization: `Bearer ${auth.data.token}`,
    },
  });

  return (
    <ApolloProvider client={client} {...props}/>
  );
}
