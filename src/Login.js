import React from 'react';
import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(3),
  },
}));

export default () => {
  const successHandler = (data) => {
    console.log(data);
    alert('success');
  };
  const failureHandler = (e) => {
    console.error(e);
    alert('failed');
  };

  const classes = useStyles();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <Grid container direction="column" alignItems="center">
      <Typography className={classes.title} variant="h4">
        Login
      </Typography>
      <GoogleLogin onSuccess={successHandler} onFailure={failureHandler} clientId={clientId}/>
    </Grid>
  );
}
