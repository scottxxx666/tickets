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

  return (
    <AuthContext.Provider value={{ auth, update }} {...props}/>
  );
};
