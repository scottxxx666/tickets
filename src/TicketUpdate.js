import React from 'react';
import TicketForm from './TicketForm';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import {useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

const GET_TICKET = gql`
    query GetTicket($id: ID!) {
        ticket(id: $id) {
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

export default () => {
  const { ticketId } = useParams();

  const { loading, error, data } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
    fetchPolicy: 'no-cache',
  });

  const ticket = data ? data.ticket : {};
  return (
    <TicketForm {...{ ticket }}></TicketForm>
  );
};
