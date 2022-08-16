import React, { useEffect, useState } from "react";
import { ClassTime, Program } from "../../classes/coaching";
import Calender from "../../components/calender";
import { API } from "./../../api";

export default function ProgramRoutine({ program }: { program: Program }) {
  const [classTimes, setClassTimes] = useState<ClassTime[]>([]);
  useEffect(() => {
    program.id &&
      API.program.getClassTimes(program.id).then((response) => {
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
