import React from "react";
import { Button, Grid } from "@mui/material";
import MyTable from "../../../components/my-table";
import { batches } from "../../../data";
import { useNavigate } from "react-router-dom";
import { students } from "./../../../data";
import SpecialLink from "../../../components/special-link";
import { ADMIN_LINKS } from "../../../links";
import AddDialog from "../../../components/add-dialog";
import CreateBatch from "../../batch/create-batch";

export default function ProgramBatchList() {
  const navigate = useNavigate();
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <AddDialog
          title="Create Batch"
          button={{ buttonLabel: "Create Batch" }}
        >
          <CreateBatch />
        </AddDialog>
      </Grid>
      <Grid item container>
        <MyTable
          data={batches.map((item) => ({
            ...item,
            subject: item.subject?.name,
          }))}
          column={[
            { title: "Name", field: "name" },
            { title: "Subject", field: "subject" },
          ]}
          onRowClick={(event, rowData) => {
            navigate("/batch");
          }}
          options={{
            toolbar: true,
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
      </Grid>
    </Grid>
  );
}
