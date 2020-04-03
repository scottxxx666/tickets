import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import React, {Fragment, useContext, useState} from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AuthContext from './AuthContext';
import AccountMenu from './AccountMenu';
import AccountCircle from './AccountCircle';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const AppTopBar = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  return (
    <Fragment>
      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar>
            <div className={classes.grow}/>
            {auth.isLogin() ? <AccountMenu/> : <AccountCircle/>}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor"/>
    </Fragment>
  );
};

export default AppTopBar;
