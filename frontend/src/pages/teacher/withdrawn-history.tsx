import { DatePicker } from "@mui/lab";
import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import DropDown from "../../components/dropdown";
import MyTable, { onRowUpdate, onRowDelete } from "../../components/my-table";
import { Field } from "../../components/person-components/about";

const data = [
  {
    programName: "HSC-21",
    batchName: "Physics-1",
    classCount: 12,
    month: "January-22",
    amount: 500,
    withdrawnDate: "28-07-22",
  },
  {
    programName: "HSC-22",
    batchName: "Physics-1",
    classCount: 4,
    month: "January-22",
    amount: 500,
    withdrawnDate: null,
  },
  {
    programName: "HSC-21",
    batchName: "Physics-2",
    classCount: 7,
    month: "January-22",
    amount: 500,
    withdrawnDate: "28-07-22",
  },
  {
    programName: "HSC-22",
    batchName: "Physics-2",
    classCount: 10,
    month: "February-22",
    amount: 500,
    withdrawnDate: null,
  },
  {
    programName: "HSC-21",
    batchName: "Physics-2",
    classCount: 12,
    month: "March-22",
    amount: 500,
    withdrawnDate: null,
  },
  {
    programName: "HSC-21",
    batchName: "Physics-1",
    classCount: 9,
    month: "March-22",
    amount: 500,
    withdrawnDate: null,
  },
  {
    programName: "HSC-21",
    batchName: "Physics-1",
    classCount: 12,
    month: "January-22",
    amount: 500,
    withdrawnDate: null,
  },
];

export default function WithdrawnHistory() {
  const [state, setState] = useState({
    columns: [
      { title: "Program Name", field: "programName" },
      { title: "Batch Name", field: "batchName" },
      { title: "Class Count", field: "classCount" },
      { title: "Month", field: "month" },
      { title: "Amount", field: "amount" },
      {
        title: "Withdrawn Date",
        field: "withdrawnDate",
        render: (rowData) =>
          rowData.withdrawnDate ? (
            rowData.withdrawnDate
          ) : (
            <Button variant="contained">Withdraw</Button>
          ),
      },
    ],
    data: data,
    filter: {
      month: null,
      year: null,
      selectedAmount: 0,
    },
  });
  useEffect(() => {
    // var input = document.getElementsByClassName(
    //   "MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeMedium css-zylse7-MuiButtonBase-root-MuiIconButton-root"
    // )[0];
    // input.addEventListener("keypress", function (event) {
    //   // @ts-ignore
    //   if (event.key === "Enter")
    //     document
    //       .getElementsByClassName(
    //         "MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeMedium css-zylse7-MuiButtonBase-root-MuiIconButton-root"
    //       )[0]
    //       // @ts-ignore
    //       .click();
    // });
  }, []);
  function updateState(object) {
    setState({ ...state, ...object });
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DropDown
            label="Month"
            value={state.filter.month}
            onChange={(event, newValue) =>
              updateState({
                filter: { ...state.filter, month: newValue },
              })
            }
            options={[
              { value: 0, label: "-- Any Month --" },
              { value: 1, label: "January" },
              { value: 2, label: "February" },
              { value: 3, label: "March" },
              { value: 4, label: "April" },
              { value: 5, label: "May" },
              { value: 6, label: "June" },
              { value: 7, label: "July" },
              { value: 8, label: "August" },
              { value: 9, label: "September" },
              { value: 10, label: "October" },
              { value: 11, label: "November" },
              { value: 12, label: "December" },
            ]}
            optionLabel="label"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DropDown
            label="Year"
            value={state.filter.year}
            onChange={(event, newValue) =>
              updateState({
                filter: { ...state.filter, year: newValue },
              })
            }
            options={[
              { value: 0, label: "-- Any Year --" },
              { value: 2018, label: "2018" },
              { value: 2019, label: "2019" },
              { value: 2020, label: "2020" },
              { value: 2021, label: "2021" },
              { value: 2022, label: "2022" },
            ]}
            optionLabel="label"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Field field="Total withdrawn" value={18587} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Field field="Remaining" value={state.filter.selectedAmount} />
        </Grid>
      </Grid>
      <Grid item container>
        <MyTable
          //@ts-ignore
          columns={state.columns.map((item) => ({ ...item, grouping: true }))}
          data={state.data}
          options={{
            selection: true,
            grouping: true,
            sorting: false,
            filtering: true,
          }}
          // onSelectionChange={(rows) => {
          //   let sum = 0;
          //   rows.forEach((item) => {
          //     sum += item.amount;
          //   });
          //   setState({
          //     ...state,
          //     filter: { ...state.filter, selectedAmount: sum },
          //   });
          // }}
        />
      </Grid>
    </Grid>
  );
}
