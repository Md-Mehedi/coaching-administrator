import React, { useEffect, useState } from "react";
import { Avatar, avatarClasses, Grid, TextField } from "@mui/material";
import MyTable from "../../components/my-table";
import DialogLayout from "../../layouts/dialog-layout";
import { DatePicker } from "@mui/lab";
import { Details, PanoramaFishEye } from "@mui/icons-material";
import StudentInfo from "../student/student-info";
import { API } from "../../api";
import { avatarForTable } from "../../tools/helper-functions";
import { Batch } from "../../classes/coaching";
import { Teacher } from "../../classes/person-info";
import DropDown from "../../components/dropdown";

function AddAttendance({ batch }: { batch: Batch }) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [state, setState] = useState<{
    columns: any;
    data: any;
    detailOpen: boolean;
    selectedStudent: any;
    selectedTeacher: Teacher | null;
    date: Date | null;
  }>({
    columns: [
      {
        title: "Image",
        field: "image",
        render: (rowData) => avatarForTable(rowData.student.person.image),
      },
      { title: "Name", field: "student.person.fullName" },
    ],
    data: [],
    date: null,
    detailOpen: false,
    selectedStudent: "",
    selectedTeacher: null,
  });
  useEffect(() => {
    batch.id &&
      API.batch.getAllStudentBatch(batch.id).then((response) => {
        setState({ ...state, data: response.data });
      });
    API.teacher.getAll().then((response) => {
      setTeachers(response.data);
    });
  }, []);

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
        <DropDown
          options={teachers}
          optionLabel="fullName"
          getOptionLabel={(item) => item.person?.fullName || ""}
          value={state.selectedTeacher}
          onChange={(event, newTeacher) =>
            setState({ ...state, selectedTeacher: newTeacher })
          }
          label={"Teacher"}
        />
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
              icon: () => <PanoramaFishEye />,
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

export default function BatchAttendance({ batch }: { batch: Batch }) {
  const [state, setState] = useState({
    columns: [
      { title: "Date", field: "date" },
      { title: "Teacher", field: "teacher" },
      { title: "Attend Student Count", field: "attendStudentCount" },
    ],
    data: [
      { date: "03-10-2022", teacher: "Ali", attendStudentCount: 20 },
      { date: "03-10-2022", teacher: "Mehedi", attendStudentCount: 30 },
      { date: "01-10-2022", teacher: "Ali", attendStudentCount: 15 },
      { date: "30-09-2022", teacher: "Ali", attendStudentCount: 20 },
      { date: "28-09-2022", teacher: "Mehedi", attendStudentCount: 23 },
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
          <AddAttendance batch={batch} />
        </DialogLayout>
      </Grid>
    </Grid>
  );
}
