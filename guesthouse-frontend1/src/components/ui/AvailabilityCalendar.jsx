import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AvailabilityCalendar = ({ bookings, onSelectSlot }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const formattedEvents = bookings.map(booking => ({
      title: `Booked (${booking.user.name})`,
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
      allDay: true,
      resource: booking,
    }));
    setEvents(formattedEvents);
  }, [bookings]);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.resource.status === 'approved' ? '#10b981' : '#f59e0b';
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div className="h-[600px] mt-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={onSelectSlot}
        eventPropGetter={eventStyleGetter}
        defaultView="month"
        views={['month', 'week', 'day']}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default AvailabilityCalendar;