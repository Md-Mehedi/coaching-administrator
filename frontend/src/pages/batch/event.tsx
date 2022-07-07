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
import React, { useState } from "react";
import { rooms } from "../../data";
import { teachers } from "./../../data";

type EventStates = {
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  teacherId: number | null;
  roomId: number | null;
  untilDate: Date | null;
};
type EventProps = {
  title: string;
  disableRepeat?: boolean;
  onDeleteClick?: (event) => void;
};
export default function Event(props: EventProps) {
  const [state, setState] = useState<EventStates>({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    untilDate: null,
    teacherId: 0,
    roomId: 0,
  });
  return (
    <Card>
      <CardHeader
        title={props.title}
        action={
          <IconButton onClick={props.onDeleteClick}>
            <ClearOutlined />
          </IconButton>
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
          {!props.disableRepeat && (
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
          )}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Teacher</InputLabel>
              <Select
                value={state.teacherId}
                label="Teacher"
                onChange={(event) => {
                  setState({
                    ...state,
                    teacherId: event.target.value as number,
                  });
                  console.log(event);
                }}
              >
                <MenuItem value={0}>-- Select Teacher --</MenuItem>
                {teachers.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Room</InputLabel>
              <Select
                value={state.roomId}
                label="Room"
                onChange={(event) => {
                  setState({
                    ...state,
                    roomId: event.target.value as number,
                  });
                  console.log(event);
                }}
              >
                <MenuItem value={0}>-- Select Room --</MenuItem>
                {rooms.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
