import { DatePicker } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import DropDown from "../components/dropdown";
import MyTable, { onRowDelete, onRowUpdate } from "../components/my-table";
import { Field } from "../components/person-components/about";

const column = [
  {
    title: "Date",
    field: "date",
    type: "date",
    initialEditValue: new Date(),
    editComponent: (props) => (
      <DatePicker
        label="Date of birth"
        value={props.value}
        onChange={props.onChange}
        // onChange={(newValue) => {
        //   props.onChange(newValue.toLocaleString());
        // }}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
    ),
  },
  { title: "Details", field: "details" },
  { title: "Amount", field: "amount", type: "numeric" },
];
const data = [
  {
    id: 1,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 2,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 3,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 4,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 5,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 6,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 7,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 8,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 9,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
  {
    id: 10,
    date: new Date().toLocaleDateString(),
    details: "Bench",
    amount: 2000,
  },
];

export default function ExpenseList() {
  const [state, setState] = useState({
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
          <Field field="Total spend" value={18587} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Field field="Selected spend" value={state.filter.selectedAmount} />
        </Grid>
      </Grid>
      <Grid item container>
        <MyTable
          //@ts-ignore
          columns={column.map((item) => ({
            ...item,
            editable: "always",
            filtering: true,
          }))}
          data={state.data}
          options={{
            searchFieldAlignment: "right",
            selection: true,
          }}
          onSelectionChange={(rows) => {
            let sum = 0;
            rows.forEach((item) => {
              sum += item.amount;
            });
            setState({
              ...state,
              filter: { ...state.filter, selectedAmount: sum },
            });
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setState({ ...state, data: [...state.data, newData] });

                  resolve(1);
                }, 1000);
              }),
            onRowUpdate: onRowUpdate(state.data, (newData) =>
              setState({ ...state, data: newData })
            ),
            onRowDelete: onRowDelete(state.data, (newData) =>
              setState({ ...state, data: newData })
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
