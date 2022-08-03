import { DateSelectArg } from "@fullcalendar/react";
import { Add, ClearOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React, { useEffect, useState } from "react";
import { rooms } from "../../data";
import { teachers } from "./../../data";
import { Teacher } from "./../../classes/person-info";
import { Room } from "../../classes/coaching";
import { API } from "../../api";
import DropDown from "../../components/dropdown";

type EventStates = {
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  selectedTeacher: Teacher | null;
  selectedRoom: Room | null;
  // date: Date | null;
  // startTime: Date | null;
  // endTime: Date | null;
  // teacherId: number | null;
  // roomId: number | null;
  // untilDate: Date | null;
};
type EventProps = {
  info?: DateSelectArg;
  title?: string;
  disableRepeat?: boolean;
  onDeleteClick?: (event) => void;
};
export default function Event(props: EventProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [state, setState] = useState<EventStates>({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    selectedTeacher: null,
    selectedRoom: null,
  });
  useEffect(() => {
    API.teacher.getAll().then((response) => {
      setTeachers(response.data);
    });
    API.room.getAll().then((response) => {
      setRooms(response.data);
    });
    setState({
      ...state,
      date: new Date(props.info?.startStr || ""),
      startTime: new Date(props.info?.startStr || ""),
      endTime: new Date(props.info?.endStr || ""),
    });
  }, []);
  console.log(state);

  return (
    <Card>
      <CardHeader
        title={props.title}
        action={
          !props.disableRepeat && (
            <IconButton onClick={props.onDeleteClick}>
              <ClearOutlined />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <MobileDatePicker
              label="Date"
              value={state.date}
              onChange={(newValue) => {
                setState({
                  ...state,
                  date: newValue,
                });
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TimePicker
              label="Start time"
              value={state.startTime}
              onChange={(newValue) =>
                setState({
                  ...state,
                  startTime: newValue,
                })
              }
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TimePicker
              label="End time"
              value={state.endTime}
              onChange={(newValue) =>
                setState({
                  ...state,
                  endTime: newValue,
                })
              }
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </Grid>
          {/* {!props.disableRepeat && (
            <Grid item xs={12} sm={6} md={4}>
              <MobileDatePicker
                label="Repeat until"
                value={state.untilDate}
                onChange={(newValue) => {
                  setState({
                    ...state,
                    untilDate: newValue,
                  });
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
          )} */}
          <Grid item xs={12} sm={6} md={4}>
            <DropDown
              label="Teacher"
              disableUserChoice
              options={teachers}
              optionLabel="person.fullName"
              value={state.selectedTeacher}
              onChange={(event, newValue) => {
                setState({ ...state, selectedTeacher: newValue });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DropDown
              label="Room"
              disableUserChoice
              options={rooms}
              optionLabel="name"
              value={state.selectedRoom}
              onChange={(event, newValue) => {
                setState({ ...state, selectedRoom: newValue });
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
