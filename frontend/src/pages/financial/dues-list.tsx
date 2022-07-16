import React from "react";
import TabLayout from "../../layouts/tab-layout";
import MonthlyBatchDues from "./monthly-batch-dues";
import OtherDues from "./other-dues";
import { CardContent, Grid } from "@mui/material";
import { Card } from "@mui/material";
import { Field } from "../../components/person-components/about";

const tabs = [
  { title: "Monthly Batch Dues", element: <MonthlyBatchDues /> },
  { title: "Other Dues", element: <OtherDues /> },
];

export default function DuesList() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Field field="Total Dues" value="289800" />
              </Grid>
              <Grid item>
                <Field field="Selected Dues" value="0" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item container>
        <TabLayout tabs={tabs} noPadding />;
      </Grid>
    </Grid>
  );
}
