import { Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTable from "../../components/my-table";
import { batches } from "../../data";
import DialogLayout from "../../layouts/dialog-layout";
import { ADMIN_LINKS } from "../../links";
import CreateBatch from "../batch/create-batch";

export default function ProgramBatchList() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    data: batches.map((item) => ({
      ...item,
      subject: item.subject?.name,
    })),
  });
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item container>
        <MyTable
          data={state.data}
          // @ts-ignore
          columns={[
            { title: "Name", field: "name" },
            { title: "Subject", field: "subject" },
          ]}
          onRowClick={(event, rowData) => {
            navigate(ADMIN_LINKS.batch.path);
          }}
          options={{
            toolbar: true,
          }}
          addButtonText="Create Batch"
          onAddButtonClick={(event) => setState({ ...state, open: true })}

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
        <DialogLayout
          open={state.open}
          onClose={(event) => setState({ ...state, open: false })}
          title="Create Batch"
        >
          <CreateBatch />
        </DialogLayout>
      </Grid>
    </Grid>
  );
}
