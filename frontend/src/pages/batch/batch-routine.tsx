import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Grid } from "@mui/material";
import UpdateButton from "../../components/update-button";

export default function BatchRoutine() {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </Grid>
      <Grid item>
        <UpdateButton />
      </Grid>
    </Grid>
  );
}
