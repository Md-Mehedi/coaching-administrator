import { DateSelectArg } from "@fullcalendar/react";
import { Add, ClearOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React, { useEffect, useState } from "react";
import { rooms } from "../../data";
import { teachers } from "./../../data";
import { Teacher } from "./../../classes/person-info";
import { ClassTime, Room } from "../../classes/coaching";
import { API } from "../../api";
import DropDown from "../../components/dropdown";
import MyTextfield from "../../components/form-components/my-textfield";
import { DatePicker } from "@mui/lab";
import DialogLayout, { DialogLayoutProps } from "./../../layouts/dialog-layout";
import {
  add,
  countToDate,
  dateToCount,
  duration,
  emptyFieldChecking,
} from "../../tools/helper-functions";
import { durationToEndTime } from "./../../tools/helper-functions";
import { useSnackbar } from "notistack";

type EventStates = {
  // repeatAllowed: boolean;
  repeatType: string;
  // untilDate: Date | null;
  // count: number;
};
type EventProps = {
  classTime: ClassTime;
  onChange: (newClassTime: ClassTime) => void;
  disableRepeat?: boolean;
  onDeleteClick?: (event) => void;
  verifier: any;
};
export function Event(props: EventProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [state, setState] = useState<EventStates>({
    // repeatAllowed: true,
    repeatType: "specific",
    // untilDate: new Date(),
    // count: 1,
  });
  props.verifier.current = errorVerifier;
  useEffect(() => {
    API.teacher.getAll().then((response) => {
      console.log(response.data);
      setTeachers(response.data);
    });
    API.room.getAll().then((response) => {
      setRooms(response.data);
    });
    console.log("in useEffect", dateToCount(props.classTime));
    // setState({
    //   ...state,
    //   repeatAllowed: dateToCount(props.classTime) > 1,
    //   repeatType: props.classTime.endDate ? "specific" : "forever",
    //   count: dateToCount(props.classTime),
    // });
    // setState({
    //   ...state,
    //   date: new Date(props.info?.startStr || ""),
    //   startTime: new Date(props.info?.startStr || ""),
    //   endTime: new Date(props.info?.endStr || ""),
    //   untilDate: new Date(props.info?.endStr || ""),
    // });
  }, [props.classTime]);
  function errorVerifier() {
    let data = [
      { label: "Room", field: props.classTime.room },
      { label: "Teacher", field: props.classTime.teacher },
    ];
    return emptyFieldChecking(enqueueSnackbar, data);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <MobileDatePicker
          label="Date"
          value={props.classTime?.startDateTime}
          onChange={(newValue) => {
            props.onChange({
              ...props.classTime,
              startDateTime: newValue,
              day: newValue?.getDay(),
            });
          }}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TimePicker
          label="Start time"
          value={props.classTime?.startDateTime}
          onChange={(newValue) =>
            props.onChange({
              ...props.classTime,
              startDateTime: newValue,
            })
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TimePicker
          label="End time"
          value={durationToEndTime(props.classTime)}
          onChange={(newValue) =>
            props.onChange({
              ...props.classTime,
              duration: newValue
                ? duration(props.classTime.startDateTime, newValue)
                : 0,
            })
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Teacher"
          disableUserChoice
          options={teachers}
          getOptionLabel={(option) => option.person?.fullName || ""}
          value={props.classTime.teacher}
          onChange={(event, newValue) =>
            props.onChange({
              ...props.classTime,
              teacher: newValue || undefined,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Room"
          disableUserChoice
          options={rooms}
          optionLabel="name"
          value={props.classTime.room}
          onChange={(event, newValue) =>
            props.onChange({
              ...props.classTime,
              room: newValue || undefined,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={1}>
          {/* <Grid item>
            <FormControlLabel
              label="Repeat"
              control={
                <Checkbox
                  checked={dateToCount(props.classTime) >= 2}
                  onChange={(event) => {
                    if (dateToCount(props.classTime) >= 2) {
                      props.onChange({
                        ...props.classTime,
                        endDate: add(
                          props.classTime.startDateTime || new Date()
                        ),
                      });
                    } else {
                      props.onChange({
                        ...props.classTime,
                        endDate: add(
                          props.classTime.startDateTime || new Date(),
                          20
                        ),
                      });
                    }
                  }}
                />
              }
            />
          </Grid> */}
          {/* {dateToCount(props.classTime) >= 2 && ( */}
          <Grid item container alignItems="center">
            <Grid item xs={6}>
              <FormControl>
                <Typography variant="h6">Repeat Frequency</Typography>
                <RadioGroup
                  value={state.repeatType}
                  onChange={(event) => {
                    setState({ ...state, repeatType: event.target.value });
                    let endDate;
                    switch (event.target.value) {
                      case "don't repeat":
                        props.onChange({
                          ...props.classTime,
                          endDate: add(
                            props.classTime.startDateTime || new Date()
                          ),
                        });
                        break;
                      case "forever":
                        props.onChange({
                          ...props.classTime,
                          endDate: undefined,
                        });
                        break;
                      case "specific":
                        if (!props.classTime.endDate) {
                          props.onChange({
                            ...props.classTime,
                            endDate: add(
                              props.classTime.startDateTime || new Date(),
                              8
                            ),
                          });
                        }
                        break;
                      case "until":
                        if (!props.classTime.endDate) {
                          props.onChange({
                            ...props.classTime,
                            endDate: add(
                              props.classTime.startDateTime || new Date(),
                              8
                            ),
                          });
                        }
                    }
                  }}
                >
                  <FormControlLabel
                    value="don't repeat"
                    control={<Radio />}
                    label="Don't repeat"
                  />
                  <FormControlLabel
                    value="forever"
                    control={<Radio />}
                    label="Forever"
                  />
                  <FormControlLabel
                    value="specific"
                    control={<Radio />}
                    label="Specific number of times"
                  />
                  <FormControlLabel
                    value="until"
                    control={<Radio />}
                    label="Until"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <>
                {state.repeatType == "specific" && (
                  <MyTextfield
                    label="Count"
                    value={dateToCount(props.classTime)}
                    type="number"
                    onChange={(event) =>
                      props.onChange({
                        ...props.classTime,
                        endDate:
                          countToDate(
                            props.classTime,
                            parseInt(event.target.value)
                          ) || undefined,
                      })
                    }
                  />
                )}
                {state.repeatType == "until" && (
                  <DatePicker
                    label="Until date"
                    value={props.classTime.endDate}
                    onChange={(newValue) =>
                      props.onChange({
                        ...props.classTime,
                        endDate: newValue || undefined,
                      })
                    }
                    renderInput={(params) => <MyTextfield {...params} />}
                  />
                )}
              </>
            </Grid>
          </Grid>
          {/* )} */}
        </Grid>
      </Grid>
    </Grid>
  );
}
export interface AddEventDialogProps extends DialogLayoutProps {
  classTime: ClassTime;
  onSave?: () => void;
  onDelete?: () => void;
  onChange: (newClassTime: ClassTime) => void;
  hideDelete?: boolean;
  verifier: any;
}
export default function AddEventDialog(props: AddEventDialogProps) {
  // const [state, setState] = useState<{ classTime: ClassTime }>({
  //   classTime: new ClassTime(),
  // });
  // useEffect(() => {
  //   setState({ ...state, classTime: props.classTime });
  // }, [props.classTime]);

  return (
    <DialogLayout
      open={props.open}
      onClose={props.onClose}
      onSaveButtonClick={props.onSave}
      onDeleteButtonClick={props.hideDelete ? undefined : props.onDelete}
    >
      <Event
        classTime={props.classTime}
        onChange={props.onChange}
        verifier={props.verifier}
      />
    </DialogLayout>
  );
}
