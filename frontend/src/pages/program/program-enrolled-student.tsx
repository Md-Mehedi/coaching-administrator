import React, { useEffect, useState } from "react";
import MyTable from "../../components/my-table";
import { students } from "../../data";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "../../links";
import { onRowDelete } from "../../components/my-table";
import DialogLayout from "../../layouts/dialog-layout";
import { Autocomplete, Avatar, Grid } from "@mui/material";
import SearchByNameOrIdField from "../../components/search-by-name-or-id-field";
import { API } from "./../../api";
import { EnrolledProgram, Program } from "../../classes/coaching";
import { useSnackbar } from "notistack";
import { apiCatch, showSnackbar } from "./../../tools/helper-functions";
import { Student } from "../../classes/person-info";

export default function ProgramEnrolledStudent({
  program,
}: {
  program: Program;
}) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState<Student[]>([]);
  const [state, setState] = useState<{
    open: boolean;
    column: any;
    enrolledStudents: Student[];
    selectedStudent: Student | null;
  }>({
    open: false,
    column: [
      { title: "Roll no", field: "person.id" },
      {
        title: "Photo",
        field: "photo",
        editable: false,
        render: (item) => (
          <Grid container justifyContent="center">
            <Avatar
              src={item.content}
              alt=""
              sx={{
                border: 3,
                height: 40,
                width: 40,
              }}
            />
          </Grid>
        ),
      },
      { title: "Name", field: "person.fullName" },
      { title: "Enrolled Date", field: "enrolledDate" },
    ],
    enrolledStudents: [],
    selectedStudent: null,
  });
  useEffect(() => {
    program.id &&
      API.program
        .getEnrolledStudents(program.id)
        .then((response) => {
          let students: Student[] = response.data;
          setState({
            ...state,
            enrolledStudents: students,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    API.student.getAll().then((res) => {
      setStudents(res.data);
    });
  }, []);

  function handleAddClick(event) {
    if (program.id && state.selectedStudent?.person?.id) {
      API.program
        .addStudent(program.id, state.selectedStudent.person.id)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({
            ...state,
            enrolledStudents: state.selectedStudent
              ? [...state.enrolledStudents, state.selectedStudent]
              : state.enrolledStudents,
            open: false,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    }
  }

  return (
    <>
      <MyTable
        data={state.enrolledStudents}
        // @ts-ignore
        columns={state.column}
        onRowClick={(event, rowData) => {
          navigate(ADMIN_LINKS.student.path + "/" + rowData?.person?.id);
        }}
        addButtonText="Add student"
        onAddButtonClick={(event) => {
          setState({ ...state, open: true });
        }}
        editable={{
          onRowDelete: onRowDelete(state.enrolledStudents, (newData) =>
            setState({ ...state, enrolledStudents: newData })
          ),
        }}
      />
      <DialogLayout
        fullWidth
        open={state.open}
        onClose={(event) => setState({ ...state, open: false })}
        title="Add student"
        saveButtonText="Add"
        onSaveButtonClick={handleAddClick}
      >
        <SearchByNameOrIdField
          students={students}
          selectedStudent={state.selectedStudent}
          onChange={(newStudent) =>
            setState({ ...state, selectedStudent: newStudent as Student })
          }
        />
      </DialogLayout>
    </>
  );
}
