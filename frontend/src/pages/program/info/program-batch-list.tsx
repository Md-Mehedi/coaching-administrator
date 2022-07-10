import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import MyTable from "../../../components/my-table";
import { batches } from "../../../data";
import { useNavigate } from "react-router-dom";
import { students } from "./../../../data";
import SpecialLink from "../../../components/special-link";
import { ADMIN_LINKS } from "../../../links";
import AddDialog from "../../../components/add-dialog";
import CreateBatch from "../../batch/create-batch";
import DialogLayout from "../../../layouts/dialog-layout";

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
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...state.data];
                  //@ts-ignore
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setState({ ...state, data: [...dataDelete] });
                  resolve(1);
                }, 1000);
              }),
          }}
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
