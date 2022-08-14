import React, { useEffect, useState } from "react";
import { ClassTime, Program } from "../../classes/coaching";
import { Student } from "../../classes/person-info";
import Calender from "../../components/calender";
import { API } from "./../../api";

export default function StudentRoutine({ student }: { student: Student }) {
  const [classTimes, setClassTimes] = useState<ClassTime[]>([]);
  useEffect(() => {
    student.person?.id &&
      API.student.getClassTimes(student.person?.id).then((response) => {
        console.log("fetched class times for program", response.data);
        setClassTimes(response.data);
      });
  }, []);

  return (
    <Calender
      readOnly
      classTimes={classTimes}
      setTitle={(classTime) => {
        return `${classTime.batch?.name} - ${classTime.teacher?.person?.nickName}(${classTime.room?.name})`;
      }}
    />
  );
}
