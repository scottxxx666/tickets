import AuthContext from './AuthContext';
import React, {useState} from 'react';
import Cookies from 'js-cookie';

function getAuth() {
  const auth = Cookies.get('auth');
  return auth ? JSON.parse(auth) : undefined;
}

export default (props) => {
  const [auth, setAuth] = useState(getAuth());
  const update = (data) => {
    Cookies.set('auth', data, { sameSite: 'lax', expires: 30 });
    setAuth(data);
  };

  const logout = () => {
    Cookies.remove('auth');
    setAuth(undefined);
  };

  const isLogin = () => {
    return auth;
  };

  const getUser = () => auth ? auth.user.name : null;
  const getToken = () => auth ? auth.token : null;

  return (
    <AuthContext.Provider value={{ data: auth, update, logout, isLogin, getUser, getToken }} {...props}/>
  );
};
