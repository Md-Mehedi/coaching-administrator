import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Field } from "../../components/person-components/about";
import TabLayout, { TabLayoutContent } from "../../layouts/tab-layout";
import ProgramBatchList from "./program-batch-list";
import ProgramEnrolledStudent from "./program-enrolled-student";
import ProgramExam from "./program-exam-list";

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

export default function Program() {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="h5">Program Name</Typography>
              </Grid>
              <Grid item>
                <Field field="Admission fees" value="300tk" />
              </Grid>
              <Grid item>
                <Field field="Description" value="300tk" />
              </Grid>
              <Grid item>
                <Field field="Starting date" value="30-02-2018" />
              </Grid>
              <Grid item>
                <Field field="Ending date" value="22-12-2020" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained">Update</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TabLayout tabs={tabs} />
      </Grid>
    </Grid>
  );
}
