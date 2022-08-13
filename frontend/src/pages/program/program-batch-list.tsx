import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { Batch, Program } from "../../classes/coaching";
import MyTable from "../../components/my-table";
import { batches } from "../../data";
import DialogLayout from "../../layouts/dialog-layout";
import { ADMIN_LINKS } from "../../links";
import CreateBatchDialog from "../batch/create-batch";
import CreateBatch from "../batch/create-batch";
import { apiCatch, showSnackbar } from "./../../tools/helper-functions";

export type ProgramBatchListStates = {
  batches: Batch[];
  pageLoading: boolean;
  dialogOpen: boolean;
  saveLoading: boolean;
  submitted: boolean;
};
export default function ProgramBatchList({ program }: { program?: Program }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const verifier = useRef<any>();
  const [state, setState] = useState<ProgramBatchListStates>({
    batches: [],
    pageLoading: true,
    dialogOpen: false,
    saveLoading: false,
    submitted: false,
  });
  useEffect(() => {
    console.log("in useeffect", program?.id);
    program?.id &&
      API.batch
        .getAll(program?.id)
        .then((res) => {
          setState({
            ...state,
            batches: res.data,
            pageLoading: false,
            submitted: false,
          });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
  }, [state.submitted, program]);
  function handleSaveButtonClick(newBatch?: Batch) {
    if (newBatch && verifier.current()) {
      newBatch.program = program;
      setState({ ...state, saveLoading: true });
      API.batch
        .add(newBatch)
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
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item container>
        <MyTable
          data={state.batches}
          isLoading={state.pageLoading}
          // @ts-ignore
          columns={[
            { title: "Name", field: "name" },
            { title: "Subject", field: "subject.name" },
            { title: "Monthly fees", field: "monthlyFees" },
          ]}
          onRowClick={(event, rowData) => {
            navigate(ADMIN_LINKS.batch.path + "/" + rowData?.id);
          }}
          options={{
            toolbar: true,
          }}
          addButtonText="Create Batch"
          onAddButtonClick={(event) => setState({ ...state, dialogOpen: true })}

          // actions={[
          //   {
          //     icon: "visibility",
          //     tooltip: "See details",
          //     onClick: (rowData) => {
          //       navigate("/student");
          //     },
          //   },
          // ]}
        />
      </Grid>
      <CreateBatchDialog
        open={state.dialogOpen}
        onSaveClick={handleSaveButtonClick}
        onClose={(event) => setState({ ...state, dialogOpen: false })}
        saveLoading={state.saveLoading}
        verifier={verifier}
      />
    </Grid>
  );
}
