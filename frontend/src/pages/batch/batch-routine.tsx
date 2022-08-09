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
  // const [state, setState] = useState<{
  //   events: EventInput[];
  //   classTimes: ClassTime[];
  // }>({
  //   events: [],
  //   classTimes: [],
  // });

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     events:
  //       batch.classTimes?.map((item) =>
  //         classTimeToEvent(item, item.room ? `Room : ${item.room?.name}` : "")
  //       ) || [],
  //     classTimes: batch.classTimes || [],
  //   });
  // }, [batch]);

  function handleOnAdd(newClassTimes: ClassTime[]) {
    // newClassTime = { ...newClassTime, batch: batch };
    // setState({
    //   ...state,
    //   events: [
    //     ...state.events,
    //     classTimeToEvent(
    //       newClassTime,
    //       newClassTime.room ? `Room : ${newClassTime.room?.name}` : ""
    //     ),
    //   ],
    // });
    // let newBatch = {
    //   ...batch,
    //   classTimes: [...state.classTimes, newClassTime],
    // };
    newClassTimes = newClassTimes.map((item) => ({ ...item, batch: batch }));

    API.classTime
      .saveAll(newClassTimes)
      .then((response) => {
        console.log(response.data);
        showSnackbar(enqueueSnackbar, response.data);
        for (let i = 0; i < newClassTimes.length; i++) {
          newClassTimes[i].id = response.data.object[i];
        }
      })
      .catch((r) => apiCatch(enqueueSnackbar, r));

    // API.classTime
    //   .add(newBatch)
    //   .then((response) => {
    //     showSnackbar(enqueueSnackbar, response.data);
    //   })
    //   .catch((r) => apiCatch(enqueueSnackbar, r));
    // console.log("in batch routine", classTimeToEvent(newClassTime));
  }

  return (
    <Calender
      preTaskBeforeSave={(classTimes) =>
        classTimes.map((item) => {
          item.batch = batch;
        })
      }
      onSaveAPI={API.classTime.saveAll}
      classTimes={batch.classTimes}
      setTitle={(classTime) => `Room : ${classTime.room?.name}`}
    />
  );
}
