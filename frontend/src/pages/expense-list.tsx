import React from "react";
import MyTable from "../components/my-table";

const column = [
  { title: "Date", field: "date", type: "date" },
  { title: "Details", field: "details" },
  { title: "Amount", field: "amount" },
];
const data = [
  { date: Date(), details: "Bench", amount: 2000 },
  { date: Date(), details: "Bench", amount: 2000 },
  { date: Date(), details: "Bench", amount: 2000 },
  { date: Date(), details: "Bench", amount: 2000 },
  { date: Date(), details: "Bench", amount: 2000 },
];

export default function ExpenseList() {
  return (
    <MyTable
      column={column.map((item) => ({
        ...item,
        editable: "always",
        filtering: true,
      }))}
      data={data}
      options={{
        searchFieldAlignment: "left",
      }}
    />
  );
}
