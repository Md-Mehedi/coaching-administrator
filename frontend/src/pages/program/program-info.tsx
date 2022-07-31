import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../api";
import { Program } from "../../classes/program-batch";
import { Field } from "../../components/person-components/about";
import TabLayout, { TabLayoutContent } from "../../layouts/tab-layout";
import { apiCatch, showSnackbar } from "../../tools/helper-functions";
import ProgramBatchList from "./program-batch-list";
import ProgramEnrolledStudent from "./program-enrolled-student";
import ProgramExam from "./program-exam-list";
import TextEditor from "./../../components/text-editor";
import UpdateDeleteButtons from "../../components/update-delete-buttons";
import Loading from "../../components/loading";
import { ADMIN_LINKS } from "../../links";
import DialogLayout from "../../layouts/dialog-layout";
import CreateProgram from "./create-program";
import CreateProgramDialog from "./create-program";

export default function ProgramInfo() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const verifier = useRef<any>();
  const [state, setState] = useState<{
    createProgramOpen: boolean;
    pageLoading: boolean;
    deleteLoading: boolean;
    program: Program;
    updateProgramUpdateLoading: boolean;
  }>({
    deleteLoading: false,
    pageLoading: true,
    program: new Program(),
    createProgramOpen: false,
    updateProgramUpdateLoading: false,
  });
  useEffect(() => {
    id &&
      API.program
        .get(parseInt(id))
        .then((response) => {
          console.log("fetched program", response.data);
          setState({ ...state, program: response.data, pageLoading: false });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
  }, [id]);

  const tabs: TabLayoutContent[] = [
    {
      title: "Exam",
      element: <ProgramExam />,
    },
    {
      title: "Batch",
      element: <ProgramBatchList />,
    },
    {
      title: "Enrolled Students",
      element: <ProgramEnrolledStudent />,
    },
  ];
  function handleUpdateClick(event) {
    setState({ ...state, createProgramOpen: true });
  }
  function handleDeleteClick(event) {
    if (id) {
      setState({ ...state, deleteLoading: true });
      API.program
        .delete(parseInt(id))
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({ ...state, deleteLoading: false });
          navigate(ADMIN_LINKS.programList.path);
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    }
  }
  function handleUpdateProgramUpdateClick(newProgram?: Program) {
    if (newProgram && verifier.current()) {
      setState({ ...state, updateProgramUpdateLoading: true });
      API.program
        .update(newProgram)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({
            ...state,
            createProgramOpen: false,
            updateProgramUpdateLoading: false,
            program: newProgram,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    }
  }
  return (
    <Loading loading={state.pageLoading}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Grid item container direction="column">
                <Grid item>
                  <Typography variant="h5">{state.program.name}</Typography>
                </Grid>
                {state.program.description && (
                  <Grid item>
                    <TextEditor value={state.program.description} readOnly />
                  </Grid>
                )}
                <Field field="Starting date" value={state.program.startDate} />
                <Field field="Ending date" value={state.program.endDate} />
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
        <Grid item xs={12}>
          <TabLayout tabs={tabs} />
        </Grid>
      </Grid>
      <CreateProgramDialog
        open={state.createProgramOpen}
        program={state.program}
        onSaveClick={handleUpdateProgramUpdateClick}
        onClose={(event) => setState({ ...state, createProgramOpen: false })}
        saveButtonText="Update"
        saveLoading={state.updateProgramUpdateLoading}
        verifier={verifier}
      />
    </Loading>
  );
}
