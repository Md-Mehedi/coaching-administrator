import { Card, CardContent, Grid } from "@mui/material";
import {
  Border,
  Chart,
  CommonSeriesSettings,
  Export,
  Legend,
  ScrollBar,
  Series,
  Title,
  Tooltip,
  ValueAxis,
  ZoomAndPan,
} from "devextreme-react/chart";
import React, { useEffect, useState } from "react";
import { API } from "../../api";
import { Batch, Program } from "../../classes/coaching";
import DropDown from "./../../components/dropdown";

interface ISource {
  date: Date | string;
  teacher: number;
  student: number;
}
const viewTypeArray = ["Last 7 days", "Last 30 days", "Last 1 year"];

function convertToDay(date: Date) {
  return date.toLocaleString("default", { weekday: "short" });
}
function convertToDate(date: Date) {
  return date.toLocaleString("default", {
    day: "numeric",
    month: "long",
  });
}
function convertToMonth(date: Date) {
  return date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
}

function generateArrayByDay(
  source: ISource[],
  day: number,
  format: (item: Date) => string
) {
  let array: ISource[] = [];
  for (let i = 0; i < day; i++) {
    let date = new Date(
      new Date().setDate(new Date().getDate() - (day - 1 - i))
    );
    date.setHours(0, 0, 0, 0);
    let data = source.filter(
      (item) => (item.date as Date).getTime() == date.getTime()
    );
    console.log(source[0].date, new Date(source[0].date), date, data);
    array.push({
      date: format(date), //new Date(date).toLocaleString("default", { weekday: "short" }),
      student: data.length ? data[0].student : 0,
      teacher: data.length ? data[0].teacher : 0,
    });
  }
  console.log(day + " days", array);
  return array;
}
function generateArrayByMonth(
  source: ISource[],
  month: number,
  format: (item: Date) => string
) {
  let array: ISource[] = [];
  for (let i = 0; i < month; i++) {
    let date = new Date(
      new Date().setMonth(new Date().getMonth() - (month - 1 - i))
    );
    console.log(date);
    date.setHours(0, 0, 0, 0);
    let studentCount: number = 0;
    let teacherCount: number = 0;
    let data = source.map((item) => {
      if ((item.date as Date).getMonth() == date.getMonth()) {
        studentCount += item.student;
        teacherCount += item.teacher;
      }
    });
    console.log(date, data);
    array.push({
      date: format(date), //new Date(date).toLocaleString("default", { weekday: "short" }),
      student: studentCount,
      teacher: teacherCount,
    });
  }
  console.log(month + " days", array);
  return array;
}

export function ProgramBatchIncomeChart() {
  const [viewType, setViewType] = useState(viewTypeArray[2]);
  const [dataSource, setDataSource] = useState<ISource[]>([]);
  const [temp, setTemp] = useState<ISource[]>();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [state, setState] = useState<{
    selectedProgram: Program | null;
    selectedBatch: Batch | null;
    batches: Batch[];
  }>({
    selectedProgram: null,
    selectedBatch: null,
    batches: [],
  });

  useEffect(() => {
    API.program.getAll().then((res) => {
      setPrograms(res.data);
    });
    // axios
    //   .get(GLOBAL.HOST + "/get-new-user-count", authHeaders())
    //   .then((response) => {
    //     console.log("new user count chart", response.data);
    //     let array = response.data.map((item) => ({
    //       student: item.studentCount,
    //       teacher: item.teacherCount,
    //       date: new Date(new Date(item.date).setHours(0, 0, 0, 0)),
    //     }));
    //     setDataSource(array);
    //     handleViewTypeChange(array, viewType);
    //   });
  }, []);

  function handleViewTypeChange(source, type) {
    setViewType(type);
    switch (type) {
      case viewTypeArray[0]:
        setTemp(generateArrayByDay(source, 7, convertToDay));
        break;
      case viewTypeArray[1]:
        setTemp(generateArrayByDay(source, 30, convertToDate));
        break;
      case viewTypeArray[2]:
        setTemp(generateArrayByMonth(source, 12, convertToMonth));
        break;
    }
  }
  function loadBatches(program: Program) {
    if (program.id) {
      setState({ ...state, selectedProgram: program });
      API.batch.getAll(program.id).then((res) => {
        setState({
          ...state,
          selectedProgram: program,
          selectedBatch: null,
          batches: res.data.object,
        });
      });
    }
  }
  // month, amount
  return (
    <Card className="chart">
      <CardContent style={{ textAlign: "center" }}>
        <Chart title="Program and Batch Income" dataSource={temp}>
          <CommonSeriesSettings argumentField="month" type="stackedBar" />
          {/* <Series valueField="amount" name="Amount (in TK)" stack="Teacher" /> */}
          {/* <Series valueField="student" name="Student" stack="Student" /> */}
          <ValueAxis>
            <Title text="Amount (in TK)" />
          </ValueAxis>
          <Legend
            position="outside"
            horizontalAlignment="center"
            verticalAlignment="bottom"
          >
            <Border visible={true} />
          </Legend>
          <Export enabled={true} />
          <Tooltip enabled={true} />
          <ScrollBar visible={true} position="bottom" />
          <ZoomAndPan argumentAxis="both" />
        </Chart>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <DropDown
              label="Program"
              value={state.selectedProgram}
              options={programs}
              optionLabel="name"
              onChange={(event, newValue) => {
                newValue && loadBatches(newValue);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DropDown
              label="Batch"
              value={state.selectedBatch}
              options={state.batches}
              optionLabel="name"
              onChange={(event, newValue) => {
                setState({ ...state, selectedBatch: newValue });
              }}
            />
          </Grid>
          {/* <Select
            value={viewType}
            onChange={(event) =>
              handleViewTypeChange(dataSource, event.target.value as string)
            }
            variant="outlined"
            style={{ backgroundColor: "#282C34" }}
          >
            {viewTypeArray.map((item) => (
              <MenuItem
                key={item}
                // @ts-ignore
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select> */}
        </Grid>
      </CardContent>
    </Card>
  );
}
