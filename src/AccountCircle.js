import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
  return (
    <Link to={location => ({ pathname: '/login', state: { from: location } })}>
      <IconButton>
        <AccountCircleIcon fontSize="large"/>
      </IconButton>
    </Link>
  );
};
