import FullCalendar, {
  CalendarOptions,
  createDuration,
} from "@fullcalendar/react"; // must go before plugins
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Grid } from "@mui/material";

export default function Calender(props: CalendarOptions) {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item container>
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          firstDay={6}
          slotMinTime={createDuration({ hour: 6 })}
          slotMaxTime={createDuration({ hour: 20 })}
          {...props}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek",
            ...props.headerToolbar,
          }}
        />
      </Grid>
    </Grid>
  );
}
