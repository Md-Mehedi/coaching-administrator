import React, { useState } from "react";
import MyTable from "../../components/my-table";

export default function OtherDues() {
  const [state, setState] = useState({
    columns: [
      { title: "Roll No", field: "id" },
      { title: "Name", field: "name" },
      { title: "Fee Type", field: "feeType" },
      { title: "Fee Name", field: "feeName" },
      { title: "Issue Date", field: "issueDate" },
      { title: "Amount", field: "amount" },
    ],
    data: [
      {
        id: 1,
        name: "Fahim",
        feeType: "Sheet",
        feeName: "Physics-1st-03",
        issueDate: "28-09-2019",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        feeType: "Sheet",
        feeName: "Physics-1st-03",
        issueDate: "28-09-2019",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        feeType: "Sheet",
        feeName: "Physics-1st-03",
        issueDate: "28-09-2019",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        feeType: "Sheet",
        feeName: "Physics-1st-03",
        issueDate: "28-09-2019",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        feeType: "Sheet",
        feeName: "Physics-1st-03",
        issueDate: "28-09-2019",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        feeType: "Sheet",
        feeName: "Physics-1st-03",
        issueDate: "28-09-2019",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        feeType: "Sheet",
        feeName: "Physics-1st-03",
        issueDate: "28-09-2019",
        amount: 500,
      },
      {
        id: 1,
        name: "Fahim",
        feeType: "Sheet",
        feeName: "Physics-1st-03",
        issueDate: "28-09-2019",
        amount: 500,
      },
    ],
  });
  return (
    <MyTable
      columns={state.columns}
      data={state.data}
      options={{
        grouping: true,
        selection: true,
        filtering: true,
      }}
    />
  );
}
