import React, { useState } from "react";
import MyTable from "../../components/my-table";
import MaterialTable from "material-table";

export default function MonthlyBatchDues() {
  const [state, setState] = useState({
    columns: [
      { title: "Roll No", field: "id" },
      { title: "Name", field: "name" },
      { title: "Program Name", field: "programName" },
      { title: "Batch Name", field: "batchName" },
      { title: "Month", field: "month" },
      { title: "Amount", field: "amount" },
    ],
    data: [
      {
        id: 1,
        name: "Fahim",
        programName: "HSC-23",
        batchName: "Physics",
        month: "January-22",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        programName: "HSC-23",
        batchName: "Physics",
        month: "January-22",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        programName: "HSC-23",
        batchName: "Physics",
        month: "January-22",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        programName: "HSC-23",
        batchName: "Physics",
        month: "January-22",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        programName: "HSC-23",
        batchName: "Physics",
        month: "January-22",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        programName: "HSC-23",
        batchName: "Physics",
        month: "January-22",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        programName: "HSC-23",
        batchName: "Physics",
        month: "January-22",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        programName: "HSC-23",
        batchName: "Physics",
        month: "January-22",
        amount: 500,
      },
    ],
  });
  return (
    <MaterialTable
      columns={state.columns}
      data={state.data}
      options={{
        grouping: true,
        selection: true,
        filtering: true,
        draggable: true,
        // sorting: false,
      }}
    />
  );
}
