import TicketTable from './TicketTable';
import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import {Link, useRouteMatch, useParams, useHistory} from 'react-router-dom';
import {gql} from 'apollo-boost';
import {useMutation, useQuery} from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(4),
  },
  icon: {
    padding: theme.spacing(0.3),
  },
}));

const GET_TICKETS = gql`
    query GetTickets($eventId: ID!) {
        tickets(eventId: $eventId) {
            id
            status
            area
            seat
            number
            price
            payment
            note
            contactInformation {
                platform
                platformId
            }
            postedBy {
                id
            }
            event {
                id
            }
            updatedAt
        }
    }
`;

const UPDATE_TICKET = gql`
    mutation UpdateTicket(
        $id:ID!
        $area: String!
        $seat: String!
        $number: Int!
        $price: Int!
        $payment: String!
        $note: String
        $contactInformation: [ContactInformationInput!]
        $eventId: ID!
    ) {
        updateTicket(
            id: $id
            input: {
                status: DONE
                area: $area
                seat: $seat
                number: $number
                price: $price
                payment: $payment
                note: $note
                contactInformation: $contactInformation
                event: {
                    id: $eventId
                }
            }) {
            id
        }
    }
`;

export default function () {
  const classes = useStyles();
  const match = useRouteMatch();
  const { eventId } = useParams();
  const { data, refetch } = useQuery(GET_TICKETS, {
    variables: { eventId },
    fetchPolicy: 'no-cache',
  });

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    onCompleted: (data) => {
      refetch();
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const history = useHistory();

  const { tickets } = data || [];
  return (
    <Container>
      <Grid
        className={classes.header}
        container
        direction="row"
        justify="flex-end"
      >
        <Grid item xs={1}>
          <Link to={`${match.url}/create`}>
            <Button variant="contained" color="primary">
              <AddBoxRoundedIcon className={classes.icon}/> 新增
            </Button>
          </Link>
        </Grid>
      </Grid>
      <TicketTable tickets={tickets} updateTicket={updateTicket} history={history}/>
    </Container>
  );
}
