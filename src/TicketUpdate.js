import React from 'react';
import {gql} from 'apollo-boost';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useHistory, useParams} from 'react-router-dom';
import TicketEdit from './TicketEdit';

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

const UPDATE_TICKET = gql`
    mutation UpdateTicket(
        $id: ID!
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
                status: WAITING
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

export default () => {
  const history = useHistory();
  const { ticketId, eventId } = useParams();

  const { loading, error, data } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
    fetchPolicy: 'no-cache',
  });
  const [saveTicket, { error2 }] = useMutation(UPDATE_TICKET, {
    onCompleted: (data) => {
      history.push(`/event/${eventId}/tickets`);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  const { ticket } = data;
  return (
    <TicketEdit {...{
      error,
      eventId: ticket.eventId,
      saveTicket,
      default: ticket,
      title: '更新售票資料',
    }}/>
  );
};
