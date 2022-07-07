import { Grid, Typography } from "@mui/material";
import React from "react";
import TabLayout, { TabLayoutContent } from "../../layouts/tab-layout";
import ProgramBatchList from "./info/program-batch-list";
import ProgramEnrolledStudent from "./info/program-enrolled-student";

const tabs: TabLayoutContent[] = [
  {
    title: "Batch",
    element: <ProgramBatchList />,
  },
  {
    title: "Enrolled Students",
    element: <ProgramEnrolledStudent />,
  },
];

export default function Program() {
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h5">Program Name</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">Admission fees : 300tk</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <TabLayout tabs={tabs} />
      </Grid>
    </Grid>
  );
}
