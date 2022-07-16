import React, { useState } from "react";
import { Avatar, Grid, TextField } from "@mui/material";
import MyTable from "../../components/my-table";
import DialogLayout from "../../layouts/dialog-layout";
import { DatePicker } from "@mui/lab";
import { Details } from "@mui/icons-material";
import StudentInfo from "../student/student-info";

function AddAttendance() {
  const [state, setState] = useState({
    columns: [
      {
        title: "Image",
        field: "image",
        render: (rowData) => <Avatar />,
      },
      { title: "Name", field: "name" },
    ],
    data: [
      { image: "", name: "Akib Nur" },
      { image: "", name: "Akib Nur" },
      { image: "", name: "Akib Nur" },
      { image: "", name: "Akib Nur" },
      { image: "", name: "Akib Nur" },
      { image: "", name: "Akib Nur" },
      { image: "", name: "Akib Nur" },
    ],
    date: null,
    detailOpen: false,
    selectedStudent: "",
  });
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <DatePicker
          label="Class Taken Date"
          value={state.date}
          onChange={(newValue) => {
            setState({
              ...state,
              date: newValue,
            });
          }}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Teacher" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <MyTable
          columns={state.columns}
          data={state.data}
          options={{
            selection: true,
            paging: false,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <Details />,
              tooltip: "See Profile",
              position: "row",
              onClick: (event, rowData) =>
                setState({
                  ...state,
                  detailOpen: true,
                  selectedStudent: "mehedi",
                }),
            },
          ]}
        />
        <DialogLayout
          fullWidth
          open={state.detailOpen}
          onClose={(event) => setState({ ...state, detailOpen: false })}
        >
          <StudentInfo />
        </DialogLayout>
      </Grid>
    </Grid>
  );
}

export default function BatchAttendance() {
  const [state, setState] = useState({
    columns: [
      { title: "Date", field: "date" },
      { title: "Teacher", field: "teacher" },
      { title: "Attend Student Count", field: "attendStudentCount" },
    ],
    data: [
      { date: "28-09-2022", teacher: "Ali", attendStudentCount: 20 },
      { date: "28-09-2022", teacher: "Ali", attendStudentCount: 20 },
      { date: "28-09-2022", teacher: "Ali", attendStudentCount: 20 },
      { date: "28-09-2022", teacher: "Ali", attendStudentCount: 20 },
      { date: "28-09-2022", teacher: "Ali", attendStudentCount: 20 },
    ],
    addDialogOpen: false,
  });
  return (
    <Grid container direction="column">
      <Grid item>
        <MyTable
          columns={state.columns}
          data={state.data}
          addButtonText="Add Attendance"
          onAddButtonClick={(event) =>
            setState({ ...state, addDialogOpen: true })
          }
        />
        <DialogLayout
          open={state.addDialogOpen}
          onClose={(event) => setState({ ...state, addDialogOpen: false })}
        >
          <AddAttendance />
        </DialogLayout>
      </Grid>
    </Grid>
  );
}
