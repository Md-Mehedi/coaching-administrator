import React, { useState } from "react";
import MyTable, { onRowAdd, onRowUpdate } from "../../components/my-table";
import { onRowDelete } from "./../../components/my-table";

export default function SubjectList() {
  const [state, setState] = useState({
    columns: [
      { title: "ID", field: "id", editable: "never" },
      { title: "Name", field: "name", editable: "always" },
      { title: "Opening Date", field: "date", editable: "never" },
    ],
    data: [
      { id: 1, name: "Physics", date: "20-03-2019" },
      { id: 2, name: "Chemistry", date: "20-03-2019" },
      { id: 3, name: "Biology", date: "20-03-2019" },
      { id: 4, name: "Mathematics", date: "20-03-2019" },
      { id: 5, name: "Higher Mathematics", date: "20-03-2019" },
      { id: 6, name: "ICT", date: "20-03-2019" },
    ],
  });
  return (
    <MyTable
      // @ts-ignore
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
