import React, { useState } from "react";
import TabLayout from "../../layouts/tab-layout";
import MonthlyBatchDues from "./monthly-batch-dues";
import OtherDues from "./other-dues";
import { CardContent, Grid, Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Field } from "../../components/person-components/about";

// const tabs = [
//   { title: "Monthly Batch Dues", element: <MonthlyBatchDues /> },
//   { title: "Other Dues", element: <OtherDues /> },
// ];

function DetailCard({ title, value }) {
  return value != 0 ? (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h3">{`${value}`}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ) : (
    <></>
  );
}

export default function DuesList() {
  const [sums, setSums] = useState({
    totalDueSum: 0,
    totalPaySum: 0,
    selectedDueSum: 0,
    selectedPaySum: 0,
  });
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>
        <DetailCard title="Total Dues" value={sums.totalDueSum} />
        <DetailCard title="Total Payments" value={sums.totalPaySum} />
        <DetailCard title="Selected Dues" value={sums.selectedDueSum} />
        <DetailCard title="Selected Payments" value={sums.selectedPaySum} />
      </Grid>
      <Grid item container>
        <MonthlyBatchDues sums={sums} setSums={(sums) => setSums(sums)} />
        {/* <TabLayout tabs={tabs} noPadding />; */}
      </Grid>
    </Grid>
  );
}
