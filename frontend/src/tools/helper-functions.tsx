import { OptionsObject } from "notistack";
import { Avatar, CardContent, Grid } from "@mui/material";
import {
  DateSelectArg,
  EventApi,
  EventInput,
  EventSourceInput,
} from "@fullcalendar/react";
import { ClassTime } from "../classes/coaching";
import { NestCamWiredStandTwoTone } from "@mui/icons-material";

export function generateVariant(success: boolean): OptionsObject {
  return { variant: success ? "success" : "error" };
}

export function showSnackbar(enqueueSnackbar, data, onSuccess = () => {}) {
  if (data.object) {
    data.success && onSuccess();
    return;
  }
  data.message &&
    enqueueSnackbar(data.message, {
      variant: data.success ? "success" : "error",
    });
  data.success && onSuccess();
}

export function emptyFieldChecking(
  enqueueSnackbar,
  data: { label: string; field: any }[]
) {
  let success = true;
  data.map((item) => {
    if (!item.field) {
      success = false;
      enqueueSnackbar(`${item.label} can't be empty`, { variant: "error" });
    }
  });
  return success;
}

export function updateArray<T>(array: T[], idx: number, newValue: T) {
  let newArray = [...array];
  newArray[idx] = newValue;
  return newArray;
}

export function apiCatch(enqueueSnackbar, onRejected) {
  console.log("In axios catch", onRejected);
  let message = "";
  switch (onRejected.response.status) {
    case 0:
      message = "Server is not running";
      break;
    case 401:
      message = `Unauthorized`;
      break;
    case 404:
      message = `API not found`;
      break;
    case 500:
      message = `Server error`;
      break;
    default:
      message = `Unknown error`;
  }
  enqueueSnackbar(
    `${onRejected.response.status} : ${onRejected.code} : ${message}`,
    { variant: "error" }
  );
}

export function createClassTime(info: DateSelectArg) {
  let classTime: ClassTime = new ClassTime();
  let day1 = new Date(info.startStr);
  let day2 = new Date(info.endStr);
  classTime.startDateTime = new Date(info.startStr);
  classTime.endDate = new Date(info.startStr);
  classTime.endDate.setDate(classTime.endDate.getDate() + 1);
  classTime.day = classTime.startDateTime.getDay();
  classTime.duration =
    (new Date(info.endStr).getTime() - new Date(info.startStr).getTime()) /
    (1000 * 60);
  return classTime;
}
export function eventToClassTime(info: EventApi) {
  let classTime: ClassTime = new ClassTime();
  let day1 = new Date(info.startStr);
  let day2 = new Date(info.endStr);
  classTime.id = parseInt(info.id);
  classTime.startDateTime = new Date(info.startStr);
  classTime.endDate = new Date(info.endStr);
  classTime.day = classTime.startDateTime.getDay();
  classTime.duration =
    (new Date(info.endStr).getTime() - new Date(info.startStr).getTime()) /
    (1000 * 60);
  return classTime;
}
export function paddingWith0(str: string | number, numDigit: number = 2) {
  str = str.toString();
  for (let i = 0; i < numDigit - str.length; i++) {
    str = "0" + str;
  }
  return str;
}
export function durationToEndTime(classTime: ClassTime) {
  if (classTime.startDateTime && classTime.duration) {
    let date = new Date(
      classTime.startDateTime?.getTime() + classTime.duration * (1000 * 60)
    );
    return date;
  }
  return null;
}
export function duration(startValue?: Date | null, endValue?: Date | null) {
  if (startValue && endValue) {
    let value = (endValue.getTime() - startValue.getTime()) / (1000 * 60);
    return value;
  }
  return 0;
}
export function dateToCount(classTime: ClassTime) {
  if (classTime.endDate && classTime.startDateTime) {
    return Math.ceil(
      (classTime.endDate?.getTime() - classTime.startDateTime?.getTime()) /
        (1000 * 60 * 60 * 24 * 7)
    );
  }
  return 0;
}
export function countToDate(classTime: ClassTime, count: number) {
  if (classTime.startDateTime && count) {
    let ans = new Date(
      classTime.startDateTime.getTime() +
        (count - 1) * (1000 * 60 * 60 * 24 * 7)
    );
    ans.setDate(ans.getDate() + 1);
    return ans;
  }
  return null;
}
export function dateFormatAsFullCalender(date: Date | null | undefined) {
  if (date) {
    date = new Date(date);
    return `${paddingWith0(date?.getFullYear())}-${paddingWith0(
      date?.getMonth() + 1
    )}-${paddingWith0(date?.getDate())}`;
  }
  return "";
}
export function timeFormatAsFullCalender(date: Date | null | undefined) {
  if (date) {
    date = new Date(date);
    return `${paddingWith0(date?.getHours())}:${paddingWith0(
      date?.getMinutes()
    )}:${paddingWith0(date?.getSeconds())}`;
  }
  return "";
}
export function classTimeToEvent(classTime: ClassTime, title: string) {
  let day1 = new Date();
  let startDT = classTime.startDateTime;
  let endT = new Date(
    new Date(startDT || new Date()).getTime() +
      (classTime.duration || 0) * 60 * 1000
  );
  let endD = classTime.endDate;
  let event: EventInput = {
    id: classTime.id?.toString(),
    title: title,
    daysOfWeek: [classTime.day?.toString()],
    startTime: timeFormatAsFullCalender(classTime.startDateTime),
    endTime: timeFormatAsFullCalender(endT),
    startRecur: classTime.endDate
      ? dateFormatAsFullCalender(classTime.startDateTime)
      : "",
    endRecur: dateFormatAsFullCalender(classTime.endDate),
  };
  return event;
}

export function add(date: Date, num: number = 1) {
  let newDate = new Date(date);
  newDate.setDate(date.getDate() + num);
  return newDate;
}

export function createFormDataWithObjectAndFile(object: any, file?: File) {
  const formData = new FormData();
  formData.append(
    "object",
    new Blob([JSON.stringify(object)], {
      type: "application/json",
    })
  );
  formData.append("file", file || new Blob([]));
  return formData;
}
export function createMultipartFromObject(object: any) {
  const formData = new FormData();
  formData.append(
    "object",
    new Blob([JSON.stringify(object)], {
      type: "application/json",
    })
  );
  return formData;
}

export function resolveURL(image) {
  return "data:image/jpeg;base64," + image;
}
export function resolvePublicImage(imageName) {
  return process.env.PUBLIC_URL + "/image/" + imageName;
}

export function avatarForTable(link) {
  return (
    <Grid container justifyContent="center">
      <Avatar
        src={resolveURL(link)}
        alt=""
        sx={{
          border: 3,
          height: 40,
          width: 40,
        }}
      />
    </Grid>
  );
}
