import { EventInput, EventSourceInput } from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import { Batch, ClassTime } from "../../classes/coaching";
import Calender from "../../components/calender";
import {
  apiCatch,
  classTimeToEvent,
  showSnackbar,
} from "./../../tools/helper-functions";
import { API } from "./../../api";
import { useSnackbar } from "notistack";

export default function BatchRoutine({ batch }: { batch: Batch }) {
  const { enqueueSnackbar } = useSnackbar();
  const [classTimes, setClassTimes] = useState<ClassTime[]>([]);
  useEffect(() => {
    batch.id &&
      API.batch.getClassTimes(batch.id).then((res) => {
        showSnackbar(enqueueSnackbar, res.data, () => {
          setClassTimes(res.data.object);
        });
      });
  }, []);

  // function handleOnAdd(newClassTimes: ClassTime[]) {
  //   newClassTimes = newClassTimes.map((item) => ({ ...item, batch: batch }));

  //   API.classTime
  //     .saveAll(newClassTimes)
  //     .then((response) => {
  //       console.log(response.data);
  //       showSnackbar(enqueueSnackbar, response.data);
  //       for (let i = 0; i < newClassTimes.length; i++) {
  //         newClassTimes[i].id = response.data.object[i];
  //       }
  //     })
  //     .catch((r) => apiCatch(enqueueSnackbar, r));
  // }

  return (
    <Calender
      preTaskBeforeSave={(classTimes) =>
        classTimes.map((item) => {
          item.batch = batch;
        })
      }
      onSaveAPI={API.classTime.saveAll}
      classTimes={classTimes}
      setTitle={(classTime) => {
        return `${classTime.teacher?.person?.nickName}(${classTime.room?.name})`;
      }}
    />
  );
}
