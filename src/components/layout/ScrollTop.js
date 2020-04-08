import React from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import makeStyles from '@material-ui/core/styles/makeStyles';

function handleClick() {
  document.querySelector('#back-to-top-anchor').scrollIntoView({ behavior: 'smooth' });
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
}));

export default () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });
  const classes = useStyles();

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon/>
        </Fab>
      </div>
    </Zoom>
  );
};
