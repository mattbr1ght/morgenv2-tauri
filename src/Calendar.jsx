import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import plLocale from '@fullcalendar/core/locales/pl';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import iCalendarPlugin from '@fullcalendar/icalendar';
import { icalEvents } from './private/icalEvents';
import rrule from "@fullcalendar/rrule";

export default function Calendar({handleEventRecieve, handleEventDragStop}) {
  const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, iCalendarPlugin]}
      locale={plLocale}
      weekNumbers={true}
      nowIndicator={true}
      editable={true}
      eventResizableFromStart={true}
      droppable={true}
      initialView="timeGridWeek"
      dateClick={handleDateClick}
      dayHeaderFormat={{
        weekday: 'short',
        day: 'numeric',
        omitCommas: true 
      }}
      //scrollTime={Date.now().toString().split('T')[1].split('.')[0]}
      scrollTimeReset={false}
      slotDuration="00:15:00"
      slotMaxTime="24:15:00"
      slotLabelFormat={
        {
          hour12: false,
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: true,
          meridiem: 'short'
        }
      }
      views={{
        dayGridFourDay: {
          type: 'timeGrid',
          buttonText: '4 dni',
          duration: { days: 4 }
        }
      }}
      headerToolbar={{
        start: 'title',
        center: '',
        end: 'prev today next dayGridMonth,timeGridWeek,timeGridDay,dayGridFourDay'
      }}
      titleFormat={{ 
        year: 'numeric',
        month: 'long'
      }}
      eventSources={[icalEvents]}
      eventReceive={handleEventRecieve}
      eventDragStop={handleEventDragStop}
      drop={(info) => {info.draggedEl.parentNode.removeChild(info.draggedEl)}}
    />
  )
}
