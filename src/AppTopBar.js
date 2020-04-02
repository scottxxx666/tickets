import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import React, {Fragment} from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
  return (
    <Fragment>
      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar>
            <div className={classes.grow}/>
            <Button
              edge="end"
              variant="contained"
              color="default"
              endIcon={<AccountCircleIcon/>}
            >{'nema'}</Button>
            <IconButton>
              <AccountCircleIcon fontSize="large"/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar/>
    </Fragment>
  );
};

export default AppTopBar;
