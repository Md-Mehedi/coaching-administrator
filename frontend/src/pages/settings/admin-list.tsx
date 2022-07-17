import React, { useState } from "react";
import { Grid } from "@mui/material";
import MyTable, { onRowUpdate } from "../../components/my-table";
import { onRowAdd, onRowDelete } from "./../../components/my-table";

export default function AdminList() {
  const [state, setState] = useState({
    columns: [
      { title: "Email", field: "email" },
      { title: "Name", field: "name" },
      {
        title: "Role",
        field: "role",
        lookup: {
          1: "Manager",
          2: "Cashier",
          3: "Examinee",
        },
      },
    ],
    data: [
      { email: "66.mehedi@gmail.com", name: "Mehedi", role: 1 },
      { email: "66.mehedi@gmail.com", name: "Mehedi", role: 2 },
      { email: "66.mehedi@gmail.com", name: "Mehedi", role: 3 },
      { email: "66.mehedi@gmail.com", name: "Mehedi", role: 1 },
      { email: "66.mehedi@gmail.com", name: "Mehedi", role: 2 },
    ],
  });
  return (
    <MyTable
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: onRowAdd(state.data, (newData) =>
          setState({ ...state, data: newData })
        ),
        onRowUpdate: onRowUpdate(state.data, (newData) =>
          setState({ ...state, data: newData })
        ),
        onRowDelete: onRowDelete(state.data, (newData) =>
          setState({ ...state, data: newData })
        ),
      }}
    />
  );
}
