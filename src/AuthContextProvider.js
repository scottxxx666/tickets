import AuthContext from './AuthContext';
import {useMutation} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {gql} from 'apollo-boost';

export default (props) => {
  const LOGIN_MUTATION = gql`
      mutation($token:String!){
          login(platform:"GOOGLE", token:$token){
              token
              user{
                  id
                  email
              }
          }
      }
  `;

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      setAuth(prev => ({ ...prev, ...data.login }));
    },
  });

  const [auth, setAuth] = useState({
    update: (tokenId) => login({ variables: { token: tokenId } }),
  });

  console.log(auth);

  return (
    <AuthContext.Provider value={auth} {...props}/>
  );
};
