import TicketTable from './TicketTable';
import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import {Link} from 'react-router-dom';
import {useRouteMatch} from 'react-router-dom';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(4),
  },
  icon: {
    padding: theme.spacing(0.3),
  },
}));

const FEED_QUERY = gql`
    {
        tickets1(artist:"artist"){
            id
            area
            artist
            seat
            number
            price
            payment
            note
            contactInformation {
                id
                platform
            }
            postedBy{
                id
            }
            event
            {
                id
            }
        }
    }
`;

export default function () {
  const classes = useStyles();
  let match = useRouteMatch();
  const { loading, error, data } = useQuery(FEED_QUERY);

  const { tickets } = data || [];
  return (
    <Container>
      <Grid
        className={classes.header}
        container
        direction="row"
        justify="flex-end"
      ><Grid item xs={1}>
        <Link to={`${match.url}/create`}>
          <Button variant="contained" color="primary">
            <AddBoxRoundedIcon className={classes.icon}/> 新增
          </Button>
        </Link>
      </Grid>
      </Grid>
      <TicketTable tickets={tickets}/>
    </Container>
  );
}
