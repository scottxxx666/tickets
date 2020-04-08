import * as React from 'react';
import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';
import {useHistory, useParams} from 'react-router-dom';
import TicketEdit from './TicketEdit';

const CREATE_TICKET = gql`
    mutation CreateTicket(
        $area: String!
        $seat: String!
        $number: Int!
        $price: Int!
        $payment: String!
        $note: String
        $contactInformation: [ContactInformationInput!]
        $eventId: ID!
    ) {
        createTicket(input: {
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

export default function () {
  const { eventId } = useParams();
  const history = useHistory();
  const [saveTicket, { error }] = useMutation(CREATE_TICKET, {
    onCompleted: (data) => {
      history.push(`/event/${eventId}/tickets`);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <TicketEdit
      {...({
        error,
        title: '新增一筆售票資料',
        eventId,
        saveTicket,
      })}
    />
  );
}
