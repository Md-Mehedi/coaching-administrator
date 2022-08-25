import { Grid, Avatar, Button } from "@mui/material";
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
import { avatarForTable } from "./../../tools/helper-functions";
import { csvTemplate } from "./../../tools/csv/csv-template";
import DropDown from "../../components/dropdown";

export default function BatchStudents({ batch }: { batch: Batch }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [state, setState] = useState<{
    open: boolean;
    importFromAnotherBatchOpen: boolean;
    selectedStudent: Student | null;
    columns: any;
    studentBatches: StudentBatch[];
    reload: boolean;
    selectedBatch: Batch | null;
  }>({
    reload: false,
    open: false,
    importFromAnotherBatchOpen: false,
    selectedStudent: null,
    columns: [
      { title: "ID", field: "student.person.id" },
      {
        title: "Photo",
        field: "photo",
        editable: false,
        render: (item) => avatarForTable(item.student.person.image),
      },
      { title: "Name", field: "student.person.fullName" },
      {
        title: "Joining date",
        field: "startDate",
        render: (rowData) => new Date(rowData.startDate).toDateString(),
      },
      // {
      //   title: "Fees",
      //   field: "fees",
      //   editable: false,
      //   render: (item) => (item.fees != 0 ? item.fees : "FREE"),
      // },
    ],
    studentBatches: [],
    selectedBatch: null,
  });
  useEffect(() => {
    batch.program?.id &&
      API.program.getEnrolledStudents(batch.program?.id).then((response) => {
        setStudents(response.data.object.map((item) => item.student));
      });
    batch.id &&
      API.batch.getAllStudentBatch(batch.id).then((res) => {
        console.log(res.data);
        setState({ ...state, studentBatches: res.data.object });
      });
    batch.program?.id &&
      API.batch.getAll(batch.program?.id).then((res) => {
        console.log("batches loaded", res.data);
        setBatches(res.data.object.filter((item) => item.id != batch.id));
      });

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
  }, [state.reload]);
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
            reload: !state.reload,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    }
  }
  function handleImportFromAnotherBatch() {
    if (batch.id && state.selectedBatch?.id) {
      setState({ ...state, importFromAnotherBatchOpen: false });
      enqueueSnackbar("Importing students from another batch...", {
        variant: "info",
      });
      API.batch
        .importFromAnotherBatch(batch.id, state.selectedBatch.id)
        .then((response) => {
          console.log("in import from another batch", response.data);
          showSnackbar(enqueueSnackbar, response.data);
          setState({
            ...state,
            importFromAnotherBatchOpen: false,
            selectedBatch: null,
            reload: !state.reload,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    }
  }
  console.log("batch-student-list", state);
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
            onRowDelete: onRowDelete(state.studentBatches, (oldData) => {
              API.batch.deleteStudent(oldData.id).then((res) => {
                showSnackbar(enqueueSnackbar, res.data);
              });
            }),
          }}
          csvTemplate={csvTemplate.enrollProgram}
          csvTemplateFileName="enroll-batch"
          importAPI={(formData) =>
            batch.id
              ? API.csvImport.enrolledBatch(batch.id, formData)
              : Promise.reject()
          }
          toolbarButtons={
            <Button
              variant="contained"
              color="primary"
              onClick={(event) =>
                setState({ ...state, importFromAnotherBatchOpen: true })
              }
            >
              Import from another batch
            </Button>
          }
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
        <DialogLayout
          fullWidth
          open={state.importFromAnotherBatchOpen}
          onClose={(event) =>
            setState({ ...state, importFromAnotherBatchOpen: false })
          }
          title="Import from another batch"
          saveButtonText="Import"
          onSaveButtonClick={handleImportFromAnotherBatch}
        >
          <DropDown
            fullWidth
            label="Batch"
            value={state.selectedBatch}
            options={batches}
            optionLabel="name"
            onChange={(event, newValue) => {
              setState({ ...state, selectedBatch: newValue });
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
