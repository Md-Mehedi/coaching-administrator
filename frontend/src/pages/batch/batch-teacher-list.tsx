import { Grid, Avatar, Button, TextField } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { Batch, TeacherPayment } from "../../classes/coaching";
import { Student, Teacher } from "../../classes/person-info";
import MyTable, { onRowDelete, onRowUpdate } from "../../components/my-table";
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
import MyTextfield from "../../components/form-components/my-textfield";

export default function BatchTeacher({ batch }: { batch: Batch }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [state, setState] = useState<{
    open: boolean;
    importFromAnotherBatchOpen: boolean;
    selectedTeacher: Teacher | null;
    columns: any;
    teacherPayments: TeacherPayment[];
    reload: boolean;
    selectedBatch: Batch | null;
    amountPerDay: number;
  }>({
    reload: false,
    open: false,
    importFromAnotherBatchOpen: false,
    selectedTeacher: null,
    columns: [
      { title: "ID", field: "teacher.person.id", editable: "never" },
      {
        title: "Photo",
        field: "photo",
        editable: false,
        render: (item) => avatarForTable(item.teacher.person.image),
      },
      { title: "Name", field: "teacher.person.fullName", editable: "never" },
      {
        title: "Amount Per Day",
        field: "amountPerDay",
        editable: "always",
      },
    ],
    teacherPayments: [],
    selectedBatch: null,
    amountPerDay: 0,
  });
  useEffect(() => {
    API.teacher.getAll().then((response) => {
      setTeachers(response.data);
    });
    batch.id &&
      API.teacherPayment.getAllByBatchId(batch.id).then((res) => {
        console.log(res.data);
        setState({ ...state, teacherPayments: res.data });
      });
    // batch.program?.id &&
    //   API.batch.getAll(batch.program?.id).then((res) => {
    //     console.log("batches loaded", res.data);
    //     setBatches(res.data.object.filter((item) => item.id != batch.id));
    //   });

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
    if (batch.id && state.selectedTeacher?.person?.id) {
      let tp: TeacherPayment = new TeacherPayment();
      tp.batch = batch;
      tp.teacher = state.selectedTeacher;
      tp.amountPerDay = state.amountPerDay;
      API.teacherPayment
        .add(tp)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({
            ...state,
            teacherPayments: state.selectedTeacher
              ? [...state.teacherPayments, response.data.object]
              : state.teacherPayments,
            open: false,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    }
  }
  // function handleImportFromAnotherBatch() {
  //   if (batch.id && state.selectedBatch?.id) {
  //     setState({ ...state, importFromAnotherBatchOpen: false });
  //     enqueueSnackbar("Importing students from another batch...", {
  //       variant: "info",
  //     });
  //     API.batch
  //       .importFromAnotherBatch(batch.id, state.selectedBatch.id)
  //       .then((response) => {
  //         console.log("in import from another batch", response.data);
  //         showSnackbar(enqueueSnackbar, response.data);
  //         setState({
  //           ...state,
  //           importFromAnotherBatchOpen: false,
  //           selectedBatch: null,
  //           reload: !state.reload,
  //         });
  //       })
  //       .catch((r) => apiCatch(enqueueSnackbar, r));
  //   }
  // }
  console.log("batch-teacher-list", state);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <MyTable
          //@ts-ignore
          columns={state.columns}
          title="Teachers"
          data={state.teacherPayments}
          onRowClick={(event, rowData) => {
            navigate(
              ADMIN_LINKS.teacher.path + "/" + rowData?.teacher?.person?.id
            );
          }}
          addButtonText="Add Teacher"
          onAddButtonClick={(event) => {
            setState({ ...state, open: true });
          }}
          editable={{
            onRowDelete: onRowDelete(
              state.teacherPayments,
              (data) => setState({ ...state, teacherPayments: data }),
              (oldData) => {
                oldData &&
                  API.teacherPayment.delete(oldData.id).then((res) => {
                    showSnackbar(enqueueSnackbar, res.data);
                  });
              }
            ),
            onRowUpdate: onRowUpdate(
              state.teacherPayments,
              (data) => setState({ ...state, teacherPayments: data }),
              (newData) => {
                console.log("in teacher payment update", newData);
                newData &&
                  API.teacherPayment.update(newData).then((res) => {
                    showSnackbar(enqueueSnackbar, res.data);
                  });
              }
            ),
          }}
          // csvTemplate={csvTemplate.enrollProgram}
          // csvTemplateFileName="enroll-teacher"
          // importAPI={(formData) =>
          //   batch.id
          //     ? API.csvImport.enrolledBatch(batch.id, formData)
          //     : Promise.reject()
          // }
          // toolbarButtons={
          //   <Button
          //     variant="contained"
          //     color="primary"
          //     onClick={(event) =>
          //       setState({ ...state, importFromAnotherBatchOpen: true })
          //     }
          //   >
          //     Import from another batch
          //   </Button>
          // }
        />
        <DialogLayout
          fullWidth
          open={state.open}
          onClose={(event) => setState({ ...state, open: false })}
          title="Add student"
          saveButtonText="Add"
          onSaveButtonClick={handleAddClick}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DropDown
                label="Teacher"
                value={state.selectedTeacher}
                onChange={(event, newValue) => {
                  setState({ ...state, selectedTeacher: newValue });
                }}
                options={teachers}
                getOptionLabel={(option) =>
                  option.person?.fullName || "Name not found"
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyTextfield
                label="Amount per day"
                value={state.amountPerDay}
                onChange={(event) => {
                  setState({
                    ...state,
                    amountPerDay: parseInt(event.target.value),
                  });
                }}
                type="number"
              />
            </Grid>
          </Grid>
        </DialogLayout>
        {/* <DialogLayout
          fullWidth
          open={state.importFromAnotherBatchOpen}
          onClose={(event) =>
            setState({ ...state, importFromAnotherBatchOpen: false })
          }import MyTextfield from './../../components/form-components/my-textfield';

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
        </DialogLayout> */}
      </Grid>
      {/* <Grid item container>
        <UpdateButton />
      </Grid> */}
    </Grid>
  );
}
