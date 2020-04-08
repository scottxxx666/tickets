import React, {useState} from 'react';
import TicketForm from './TicketForm';

export default function (props) {
  const [ticket, setTicket] = useState({
    area: null,
    seat: null,
    number: 1,
    price: null,
    payment: null,
    note: '',
    eventId: props.eventId,
  });
  const [contactInformation, setContactInformation] = useState([
    { platform: 'PTT', platformId: '' },
    { platform: 'LINE', platformId: '' },
  ]);

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
        contactInformation,
        number: parseInt(ticket.number, 10),
        price: parseInt(ticket.price, 10),
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
