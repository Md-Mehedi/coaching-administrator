import React, { useEffect, useState } from "react";
import { ClassTime, Program } from "../../classes/coaching";
import { Teacher } from "../../classes/person-info";
import Calender from "../../components/calender";
import { API } from "./../../api";

export default function TeacherRoutine({ teacher }: { teacher: Teacher }) {
  const [classTimes, setClassTimes] = useState<ClassTime[]>([]);
  useEffect(() => {
    teacher.person?.id &&
      API.teacher.getClassTimes(teacher.person.id).then((response) => {
        console.log("fetched class times for program", response.data);
        setClassTimes(response.data);
      });
  }, []);

  return (
    <Calender
      readOnly
      classTimes={classTimes}
      setTitle={(classTime) => {
        console.log("in settitle", classTime);
        return `${classTime.batch?.name} - (${classTime.room?.name})`;
      }}
    />
  );
}
