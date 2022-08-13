import { Grid, Avatar } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { Batch } from "../../classes/coaching";
import { Student } from "../../classes/person-info";
import MyTable, { onRowDelete } from "../../components/my-table";
import SearchByNameOrIdField from "../../components/search-by-name-or-id-field";
import UpdateButton from "../../components/update-button";
import DialogLayout from "../../layouts/dialog-layout";
import { ADMIN_LINKS } from "../../links";
import { StudentBatch } from "./../../classes/coaching";
import { useSnackbar } from "notistack";
import { apiCatch, showSnackbar } from "../../tools/helper-functions";

export default function BatchStudents({ batch }: { batch: Batch }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState<Student[]>([]);
  const [state, setState] = useState<{
    open: boolean;
    selectedStudent: Student | null;
    columns: any;
    studentBatches: StudentBatch[];
  }>({
    open: false,
    selectedStudent: null,
    columns: [
      { title: "Roll no", field: "student.person.id" },
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
      { title: "Name", field: "student.person.fullName" },
      {
        title: "Fees",
        field: "fees",
        editable: false,
        render: (item) => (item.fees != 0 ? item.fees : "FREE"),
      },
    ],
    studentBatches: [],
  });
  useEffect(() => {
    batch.program?.id &&
      API.program.getEnrolledStudents(batch.program?.id).then((response) => {
        setStudents(response.data);
      });
    batch.id &&
      API.batch.getAllStudentBatch(batch.id).then((res) => {
        setState({ ...state, studentBatches: res.data });
        // Fetching enrolled student in program
        // batch.program?.id &&
        //   API.program
        //     .getEnrolledStudents(batch.program?.id)
        //     .then((response) => {
        //       let studentBatch: StudentBatch[] = response.data;
        //       let enrolledInProgram: Student[] = res.data;
        //       setStudents(
        //         enrolledInProgram.filter((student) => {
        //           let found = false;
        //           studentBatch.map((item) => {
        //             if (item.student?.person?.id == student.person?.id) {
        //               found = true;
        //               return;
        //             }
        //           });
        //           return !found;
        //         })
        //       );
        //     });
      });
  }, []);
  function handleAddClick(event) {
    if (batch.id && state.selectedStudent?.person?.id) {
      API.batch
        .addStudent(batch.id, state.selectedStudent.person.id)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({
            ...state,
            studentBatches: state.selectedStudent
              ? [
                  ...state.studentBatches,
                  {
                    batch: batch,
                    student: state.selectedStudent,
                  },
                ]
              : state.studentBatches,
            open: false,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    }
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <MyTable
          //@ts-ignore
          columns={state.columns}
          title="Enrolled Students"
          data={state.studentBatches}
          onRowClick={(event, rowData) => {
            navigate(
              ADMIN_LINKS.student.path + "/" + rowData?.student?.person?.id
            );
          }}
          addButtonText="Add Student"
          onAddButtonClick={(event) => {
            setState({ ...state, open: true });
          }}
          editable={{
            onRowDelete: onRowDelete(state.studentBatches, (newData) =>
              setState({ ...state, studentBatches: newData })
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
            onChange={(newStudent) => {
              setState({ ...state, selectedStudent: newStudent as Student });
            }}
          />
        </DialogLayout>
      </Grid>
      {/* <Grid item container>
        <UpdateButton />
      </Grid> */}
    </Grid>
  );
}
