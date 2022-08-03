import FullCalendar, {
  CalendarOptions,
  createDuration,
  DateSelectArg,
} from "@fullcalendar/react"; // must go before plugins
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
//@ts-ignore
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Grid } from "@mui/material";
import DialogLayout from "../layouts/dialog-layout";
import Event from "../pages/class-time/event";
import { useState } from "react";

export default function Calender(props: CalendarOptions) {
  const [state, setState] = useState<{
    eventDialogOpen: boolean;
    selectedEventInfo?: DateSelectArg;
  }>({
    eventDialogOpen: false,
  });
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item container>
        <FullCalendar
          //@ts-ignore
          plugins={[interactionPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          firstDay={6}
          slotMinTime={createDuration({ hour: 6 })}
          slotMaxTime={createDuration({ hour: 20 })}
          selectable
          select={(info) => {
            console.log(info);
            setState({
              ...state,
              eventDialogOpen: true,
              selectedEventInfo: info,
            });
          }}
          {...props}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek",
            ...props.headerToolbar,
          }}
        />
      </Grid>
      <DialogLayout
        open={state.eventDialogOpen}
        onClose={(event) => setState({ ...state, eventDialogOpen: false })}
      >
        <Event info={state.selectedEventInfo} />
      </DialogLayout>
    </Grid>
  );
}
