// import ExamList from "./exam-list";
import BatchRoutine from "./batch-routine";
import BatchStudentHistory from "./batch-student-history";
import BatchStudents from "./batch-student-list";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { IBatch, batches } from "../../data";
import TabLayout from "../../layouts/tab-layout";
import { Field } from "../../components/person-components/about";
import BatchAttendance from "./batch-attendance";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { API } from "../../api";
import { apiCatch, showSnackbar } from "./../../tools/helper-functions";
import { useSnackbar } from "notistack";
import UpdateDeleteButtons from "../../components/update-delete-buttons";
import { Batch } from "../../classes/coaching";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "./../../links";
import Loading from "../../components/loading";
import CreateBatchDialog from "./create-batch";
import BatchTeacher from "./batch-teacher-list";

export default function BatchInfo() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const verifier = useRef<any>();
  const [state, setState] = useState<{
    createBatchOpen: boolean;
    updateBatchUpdateLoading: boolean;
    batch: Batch;
    deleteLoading: boolean;
    pageLoading: boolean;
  }>({
    batch: new Batch(),
    createBatchOpen: false,
    updateBatchUpdateLoading: false,
    deleteLoading: false,
    pageLoading: true,
  });
  useEffect(() => {
    id &&
      API.batch
        .get(parseInt(id))
        .then((res) => {
          showSnackbar(enqueueSnackbar, res.data, () => {
            setState({ ...state, batch: res.data.object, pageLoading: false });
            console.log("retrieve batch : ", res.data);
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
  }, [id]);
  function handleUpdateClick() {
    setState({ ...state, createBatchOpen: true });
  }
  function handleUpdateBatchUpdateClick(newBatch?: Batch) {
    if (newBatch) {
      setState({ ...state, updateBatchUpdateLoading: true });
      API.batch.update(newBatch).then((response) => {
        showSnackbar(enqueueSnackbar, response.data);
        setState({
          ...state,
          createBatchOpen: false,
          updateBatchUpdateLoading: false,
          batch: newBatch,
        });
      });
    }
  }
  function handleDeleteClick() {
    if (state.batch?.id) {
      setState({ ...state, deleteLoading: true });
      API.batch
        .delete(state.batch?.id)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({ ...state, deleteLoading: false });
          navigate(-1);
        })
        .catch((r) => {
          setState({ ...state, deleteLoading: false });
          apiCatch(enqueueSnackbar, r);
        });
    }
  }
  const tabs = [
    {
      title: "Routine",
      element: <BatchRoutine batch={state.batch} />,
    },
    {
      title: "Students",
      element: <BatchStudents batch={state.batch} />,
    },
    {
      title: "Teachers",
      element: <BatchTeacher batch={state.batch} />,
    },
    {
      title: "Attendance",
      element: <BatchAttendance batch={state.batch} />,
    },
    // {
    //   title: "Students History",
    //   element: <BatchStudentHistory />,
    // },
  ];
  return (
    // <Admin>
    <Loading loading={state.pageLoading}>
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Grid item container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="h4">
                      {"Batch : "} {state.batch?.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Field
                      field="Program name"
                      value={state.batch?.program?.name}
                    />
                  </Grid>
                  <Grid item>
                    <Field field="Subject" value={state.batch?.subject?.name} />
                  </Grid>
                  <Grid item>
                    <Field
                      field="Monthly fees"
                      value={state.batch?.monthlyFees}
                    />
                  </Grid>
                  {/* <Grid item>
                  <Field
                    field="Assigned teacher(s)"
                    value={data.assignedTeachers.map((item, index) => (
                      <>
                        {index != 0 ? ", " : ""}
                        {item}
                      </>
                    ))}
                  />
                </Grid> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <UpdateDeleteButtons
              deleteLoading={state.deleteLoading}
              onUpdateClick={handleUpdateClick}
              onDeleteClick={handleDeleteClick}
            />
          </Grid>
        </Grid>

        <Grid item container>
          <TabLayout tabs={tabs} />
        </Grid>
      </Grid>
      <CreateBatchDialog
        open={state.createBatchOpen}
        batch={state.batch}
        onSaveClick={handleUpdateBatchUpdateClick}
        onClose={(event) => setState({ ...state, createBatchOpen: false })}
        saveButtonText="Update"
        saveLoading={state.updateBatchUpdateLoading}
        verifier={verifier}
      />
    </Loading>
    // </Admin>
  );
}
