import { AddCircleOutline } from "@mui/icons-material";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { API } from "../../api";
import SpecialLink from "../../components/special-link";
import DialogLayout from "../../layouts/dialog-layout";
import { ADMIN_LINKS } from "../../links";
import { showSnackbar } from "../../tools/helper-functions";
import { useSnackbar } from "notistack";
import { apiCatch } from "./../../tools/helper-functions";
import Loading from "../../components/loading";
import CreateProgramDialog from "./create-program";
import { Program } from "../../classes/coaching";

function ProgramCards({ programs }: { programs: Program[] }) {
  return (
    <Grid container spacing={2}>
      {programs.map((program, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={4} lg={3} xl={2}>
          <SpecialLink href={ADMIN_LINKS.program.path + "/" + program.id}>
            <Card sx={{ width: "100%" }}>
              <CardActionArea>
                <CardContent>
                  <Grid
                    container
                    sx={{ height: 130, textAlign: "center" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h5">{program.name}</Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </SpecialLink>
        </Grid>
      ))}
    </Grid>
  );
}

export default function ProgramList() {
  const { enqueueSnackbar } = useSnackbar();
  const verifier = useRef<any>();
  const [state, setState] = useState<{
    programs: Program[];
    pageLoading: boolean;
    dialogOpen: boolean;
    saveLoading: boolean;
    submitted: boolean;
  }>({
    programs: [],
    pageLoading: true,
    dialogOpen: false,
    saveLoading: false,
    submitted: false,
  });
  useEffect(() => {
    API.program
      .getAll()
      .then((response) => {
        setState({
          ...state,
          programs: response.data,
          pageLoading: false,
          submitted: false,
        });
      })
      .catch((r) => apiCatch(enqueueSnackbar, r));
  }, [state.submitted]);

  function handleSaveButtonClick(newProgram?: Program) {
    if (newProgram && verifier.current()) {
      setState({ ...state, saveLoading: true });
      API.program
        .add(newProgram)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({
            ...state,
            dialogOpen: false,
            saveLoading: false,
            submitted: true,
          });
        })
        .catch((r) => {
          setState({ ...state, saveLoading: false });
          apiCatch(enqueueSnackbar, r);
        });
    }
  }
  return (
    <Loading loading={state.pageLoading}>
      <Grid container direction="column" spacing={3} alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={(event) => setState({ ...state, dialogOpen: true })}
          >
            Add New Program
          </Button>
        </Grid>
        <Grid item container>
          <ProgramCards programs={state.programs} />
        </Grid>
        <CreateProgramDialog
          open={state.dialogOpen}
          onSaveClick={handleSaveButtonClick}
          onClose={(event) => setState({ ...state, dialogOpen: false })}
          saveLoading={state.saveLoading}
          verifier={verifier}
        />
      </Grid>
    </Loading>
  );
  // return (
  //   <Admin>
  //     <Grid container direction="row" spacing={2} alignItems="flex-start">
  //       <Grid item xs={6}>
  //         <Grid container direction="column">
  //           <Grid item container justifyContent="center">
  //             <Button variant="contained" startIcon={<AddCircleOutline />}>
  //               Add New Program
  //             </Button>
  //           </Grid>

  //         </Grid>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Grid container direction="column">
  //           <Grid item container justifyContent="center">
  //             <Button variant="contained" startIcon={<AddCircleOutline />}>
  //               Add New Batch
  //             </Button>
  //           </Grid>
  //           <Grid item container>
  //             <MaterialTable
  //               style={{ width: "100%" }}
  //               //@ts-ignore
  //               columns={state.batchColumn.map((item) => ({
  //                 ...item,
  //                 align: "center",
  //               }))}
  //               title="Batches"
  //               data={batches}
  //               options={{
  //                 paging: batches.length > 10,
  //                 headerStyle: { textAlign: "center" },
  //                 actionsColumnIndex: -1,
  //                 addRowPosition: "first",
  //                 pageSize: 10,
  //               }}
  //               // actions={[
  //               //   {
  //               //     icon: "visibility",
  //               //     tooltip: "see teacher",
  //               //     onClick: (event, rowData) => {
  //               //       console.log(rowData);
  //               //       // history.push(`/profile/${rowData.username}`);
  //               //     },
  //               //   },
  //               // ]}
  //             />
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   </Admin>
  // );
}
