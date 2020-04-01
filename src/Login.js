import React, {useContext} from 'react';
import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import AuthContext from './AuthContext';
import {useHistory, useLocation} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(3),
  },
}));

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      auth.update(data.login);
    },
  });

  const history = useHistory();
  const auth = useContext(AuthContext);
  const successHandler = (data) => {
    login({ variables: { token: data.tokenId } });
    history.push(url);
  };
  const failureHandler = (e) => {
    console.error(e);
  };

  const query = useQuery();
  const url = query.get('url');

  const classes = useStyles();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <Grid container direction="column" alignItems="center">
      <Typography className={classes.title} variant="h4"/>
      <GoogleLogin onSuccess={successHandler} onFailure={failureHandler} clientId={clientId}/>
    </Grid>
  );
}
