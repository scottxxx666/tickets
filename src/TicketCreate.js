import * as React from 'react';
import {useState} from 'react';
import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';
import {useHistory, useParams} from 'react-router-dom';
import TicketForm from './TicketForm';

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
  const [ticket, setTicket] = useState({
    area: null,
    seat: null,
    number: 1,
    price: null,
    payment: null,
    note: '',
    contactInformation: [
      { platform: 'PTT', platformId: '' },
      { platform: 'LINE', platformId: '' },
    ],
  });
  const [contactInformation, setContactInformation] = useState([]);
  const [createTicket, { error }] = useMutation(CREATE_TICKET, {
    variables: {
      eventId: eventId,
      ...ticket,
      number: parseInt(ticket.number, 10),
      price: parseInt(ticket.price, 10),
      contactInformation,
    },
    onCompleted: (data) => {
      history.push(`/event/${eventId}/tickets`);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setTicket(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleContactChange(event) {
    const platform = event.target.dataset.platform;
    const platformId = event.target.value;
    setContactInformation(prev => [...prev.filter(e => e.platform !== platform), { platform, platformId }]);
  }

  async function submit() {
    return createTicket();
  }

  return (
    <TicketForm
      {...({
        handleChange,
        handleContactChange,
        submit,
        error,
        ticket,
        title: '新增一筆售票資料',
      })}
    />
  );
}
