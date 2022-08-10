import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import Event from "./event";

type EventsStates = {
  events: {
    title: string;
  }[];
};
type EventsProps = {
  disableMoreClass?: boolean;
  disableRepeat?: boolean;
};
export default function Events(props: EventsProps) {
  const [state, setState] = useState<EventsStates>({
    events: [{ title: "Class 1" }],
  });
  return (
    <Grid container direction="column" spacing={2}>
      {state.events.map((event, index) => (
        <Grid item>
          {/* <Event
            title={event.title}
            disableRepeat={props.disableRepeat}
            onDeleteClick={(event) => {
              if (state.events.length == 1) {
                return;
              }
              const newEvents = state.events;
              newEvents.splice(index, 1);
              setState({
                ...state,
                events: newEvents,
              });
            }}
          /> */}
        </Grid>
      ))}
      <Grid item>
        {!props.disableMoreClass && (
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={(event) => {
                    setState({
                      ...state,
                      events: [
                        ...state.events,
                        { title: "Class " + (state.events.length + 1) },
                      ],
                    });
                  }}
                >
                  Add More Class
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
