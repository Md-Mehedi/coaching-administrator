import FullCalendar, {
  CalendarOptions,
  createDuration,
  DateSelectArg,
  EventInput,
} from "@fullcalendar/react"; // must go before plugins
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
//@ts-ignore
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ClassTime } from "../classes/coaching";
import {
  classTimeToEvent,
  createClassTime as createClassTime,
  eventToClassTime,
  showSnackbar,
} from "../tools/helper-functions";
import AddEventDialog from "../pages/class-time/event";
import { useSnackbar } from "notistack";
import { AxiosResponse } from "axios";
import { apiCatch } from "./../tools/helper-functions";
import { API } from "../api";
export interface CalenderProps extends CalendarOptions {
  classTimes: ClassTime[];
  setTitle: (classTime: ClassTime) => string;
  preTaskBeforeSave?: (classTimes: ClassTime[]) => void;
  onSaveAPI?: (classTimes: ClassTime[]) => any;
  readOnly?: boolean;
}
export default function Calender(props: CalenderProps) {
  const verifier = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState<{
    eventDialogOpen: boolean;
    currentClassTime?: ClassTime | null;
    classTimes: ClassTime[];
    events: EventInput[];
    isNew: boolean;
  }>({
    eventDialogOpen: false,
    currentClassTime: null,
    classTimes: [],
    events: [],
    isNew: false,
  });

  useEffect(() => {
    let ct = props.classTimes?.map((item) => new ClassTime(item));
    setState({
      ...state,
      classTimes: ct || [],
      events:
        props.classTimes?.map((item) =>
          classTimeToEvent(item, props.setTitle(item))
        ) || [],
    });
  }, [props.classTimes]);

  function save(classTimes: ClassTime[]) {
    props.preTaskBeforeSave && props.preTaskBeforeSave(classTimes);
    let afterRemove = state.classTimes.filter((item) => {
      let found = false;
      for (let i = 0; i < classTimes.length; i++) {
        if (classTimes[i].id == item.id) {
          found = true;
        }
      }
      return !found;
    });
    props.onSaveAPI &&
      props
        .onSaveAPI(classTimes)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({
            ...state,
            classTimes: [
              ...afterRemove,
              ...response.data.object.map((item) => new ClassTime(item)),
            ],
            events: [
              ...afterRemove.map((item) =>
                classTimeToEvent(item, props.setTitle(item))
              ),
              ...response.data.object.map((item) =>
                classTimeToEvent(item, props.setTitle(item))
              ),
            ],
            eventDialogOpen: false,
            currentClassTime: null,
            isNew: false,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
  }
  function remove(classTime: ClassTime) {
    let afterRemove = state.classTimes.filter(
      (item) => item.id != classTime.id
    );
    classTime.id &&
      API.classTime
        .delete(classTime.id)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({
            ...state,
            classTimes: afterRemove,
            events: afterRemove.map((item) =>
              classTimeToEvent(item, props.setTitle(item))
            ),
            eventDialogOpen: false,
            currentClassTime: null,
            isNew: false,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
  }

  function handleOnSaveClick() {
    if (state.currentClassTime && verifier.current()) {
      let newTimes = [state.currentClassTime];
      save(newTimes);
    }
  }
  function handleOnDeleteClick() {
    if (state.currentClassTime) {
      remove(state.currentClassTime);
    }
  }

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item container sx={{ height: "919px", width: "1135px" }}>
        <FullCalendar
          events={state.events}
          //@ts-ignore
          plugins={[interactionPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          firstDay={6}
          slotMinTime={createDuration({ hour: 6 })}
          slotMaxTime={createDuration({ hour: 20 })}
          selectable={!props.readOnly}
          select={(info) => {
            setState({
              ...state,
              eventDialogOpen: true,
              currentClassTime: createClassTime(info),
              isNew: true,
            });
          }}
          {...props}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek",
            ...props.headerToolbar,
          }}
          eventClick={(event) => {
            if (props.readOnly) return;
            setState({
              ...state,
              currentClassTime: state.classTimes.find(
                (item) => item.id == parseInt(event.event.id)
              ),
              eventDialogOpen: true,
              isNew: false,
            });
          }}
        />
        <AddEventDialog
          open={state.eventDialogOpen}
          classTime={state.currentClassTime || new ClassTime()}
          onChange={(newClassTime) => {
            setState({
              ...state,
              currentClassTime: newClassTime,
            });
          }}
          onSave={handleOnSaveClick}
          onDelete={handleOnDeleteClick}
          hideDelete={state.isNew}
          onClose={(event) => {
            setState({
              ...state,
              eventDialogOpen: false,
              currentClassTime: null,
            });
          }}
          verifier={verifier}
        />
      </Grid>
    </Grid>
  );
}
