import React, {useState} from 'react';
import TicketForm from './TicketForm';
import {removePrivateFields} from '../../utils/object';

export default function (props) {
  const defaultTicket = props.default;
  const [ticket, setTicket] = useState(defaultTicket || {
    area: null,
    seat: null,
    number: 1,
    price: null,
    payment: null,
    note: '',
    event: { id: props.eventId },
  });
  const [contactInformation, setContactInformation] = useState(
    defaultTicket ?
      defaultTicket.contactInformation : [
        { platform: 'PTT', platformId: '' },
        { platform: 'LINE', platformId: '' },
      ],
  );

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

  function submit() {
    props.saveTicket({
      variables: {
        ...ticket,
        contactInformation: contactInformation.map(removePrivateFields),
        number: parseInt(ticket.number, 10),
        price: parseInt(ticket.price, 10),
        eventId: ticket.event.id,
      },
    });
  }

  return (
    <TicketForm
      {...({
        ...props,
        handleChange,
        handleContactChange,
        ticket: {
          ...ticket,
          contactInformation,
        },
        submit,
      })}
    />
  );
}
