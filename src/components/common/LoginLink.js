import {Link} from 'react-router-dom';
import React from 'react';

export default (props) => {
  return (
    <Link
      to={location => ({ pathname: '/login', state: { from: location } })}
      {...props}
    />
  );
};
