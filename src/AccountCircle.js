import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import LoginLink from './LoginLink';

export default () => {
  return (
    <LoginLink>
      <IconButton>
        <AccountCircleIcon fontSize="large"/>
      </IconButton>
    </LoginLink>
  );
};
