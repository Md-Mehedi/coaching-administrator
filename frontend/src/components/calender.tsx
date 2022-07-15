import FullCalendar, { CalendarOptions } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Grid } from "@mui/material";

export default function Calender(props: CalendarOptions) {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          {...props}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
            ...props.headerToolbar,
          }}
        />
      </Grid>
    </Grid>
  );
}
