import React, { useEffect, useRef, useState } from "react";
import MyTable from "../../components/my-table";
import MaterialTable from "material-table";
import { MonthlyFees } from "./../../classes/coaching";
import { API } from "../../api";
import { Button, Typography } from "@mui/material";
import { showSnackbar } from "../../tools/helper-functions";
import { useSnackbar } from "notistack";

export default function MonthlyBatchDues({ sums, setSums }) {
  const tableRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState<{
    columns: any[];
    data: MonthlyFees[];
    selectedRows: MonthlyFees[];
  }>({
    columns: [
      { title: "Roll No", field: "student.person.id" },
      { title: "Name", field: "student.person.fullName" },
      { title: "Program Name", field: "batch.program.name" },
      { title: "Batch Name", field: "batch.name" },
      { title: "Amount", field: "amount" },
      {
        title: "Month",
        field: "month",
        render: (rowData) => new Date(rowData.dueDate).toLocaleDateString(),
      },
      {
        title: "Payment Date",
        field: "month",
        render: (rowData) =>
          rowData.paymentDate ? (
            new Date(rowData.paymentDate).toLocaleDateString()
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>Not Paid</Typography>
          ),
      },
    ],
    data: [],
    selectedRows: [],
  });
  useEffect(() => {
    API.monthlyFees.getAllByCoaching().then((response) => {
      console.log("in mothly fees api", response);
      let dueSum = 0;
      let paySum = 0;
      response.data.forEach((item) => {
        if (!item.paymentDate) {
          dueSum += item.amount;
        } else {
          paySum += item.amount;
        }
      });
      setSums({ ...sums, totalDueSum: dueSum, totalPaySum: paySum });
      setState({ ...state, data: response.data });
    });
  }, []);

  function handlePayButtonClicked(event) {
    state.selectedRows.length > 0 &&
      API.monthlyFees
        .pay(state.selectedRows.map((item) => item.id))
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data, () => {
            state.selectedRows.forEach((item) => {
              item.paymentDate = new Date();
            });
            // @ts-ignore
            tableRef.current != null && tableRef.current.onAllSelected(false);
            setState({ ...state, selectedRows: [] });
          });
        });
  }

  return (
    <MyTable
      tableRef={tableRef}
      title="Payment and Dues"
      columns={state.columns}
      data={state.data}
      options={{
        grouping: true,
        selection: true,
        filtering: true,
        draggable: true,
        pageSize: 10,
        // sorting: false,
      }}
      toolbarButtons={
        state.selectedRows.length > 0 ? (
          <>
            <Button variant="contained" onClick={handlePayButtonClicked}>
              Pay
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
              onClick={(event) => {
                tableRef.current != null &&
                  // @ts-ignore
                  tableRef.current.onAllSelected(false);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <></>
        )
      }
      onSelectionChange={(rows) => {
        let dueSum = 0;
        let paySum = 0;
        for (let i = 0; i < rows.length; i++) {
          if (!rows[i].paymentDate) {
            dueSum += rows[i].amount;
          } else {
            paySum += rows[i].amount;
          }
        }
        setSums({ ...sums, selectedPaySum: paySum, selectedDueSum: dueSum });
        setState({ ...state, selectedRows: rows });
      }}
    />
  );
}

// [
//   {
//     id: 1,
//     name: "Fahim",
//     programName: "HSC-23",
//     batchName: "Physics",
//     month: "January-22",
//     amount: 500,
//   },
//   {
//     id: 1,
//     name: "Fahim",
//     programName: "HSC-23",
//     batchName: "Physics",
//     month: "January-22",
//     amount: 500,
//   },
//   {
//     id: 1,
//     name: "Fahim",
//     programName: "HSC-23",
//     batchName: "Physics",
//     month: "January-22",
//     amount: 500,
//   },
//   {
//     id: 1,
//     name: "Fahim",
//     programName: "HSC-23",
//     batchName: "Physics",
//     month: "January-22",
//     amount: 500,
//   },
//   {
//     id: 1,
//     name: "Fahim",
//     programName: "HSC-23",
//     batchName: "Physics",
//     month: "January-22",
//     amount: 500,
//   },
//   {
//     id: 1,
//     name: "Fahim",
//     programName: "HSC-23",
//     batchName: "Physics",
//     month: "January-22",
//     amount: 500,
//   },
//   {
//     id: 1,
//     name: "Fahim",
//     programName: "HSC-23",
//     batchName: "Physics",
//     month: "January-22",
//     amount: 500,
//   },
//   {
//     id: 1,
//     name: "Fahim",
//     programName: "HSC-23",
//     batchName: "Physics",
//     month: "January-22",
//     amount: 500,
//   },
// ],
