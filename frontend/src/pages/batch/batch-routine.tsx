import React from "react";
import Calender from "../../components/calender";

export default function BatchRoutine() {
  return (
    <Calender
      events={[
        {
          title: "12 Physics",
          start: "2022-07-16T08:00:00",
          end: "2022-07-16T09:00:00",
        },
        {
          title: "Chemistry",
          daysOfWeek: ["4"],
          startTime: "09:00:00",
          endTime: "10:00:00",
          startRecur: "2022-07-16",
          endRecur: "2022-09-22",
        },
      ]}
    />
  );
}
