import React from "react";
import MobileLayout from "../../layouts/mobile";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { StudentMonthChart } from "./student-month-chart";
import { ExpenseMonthChart } from "./expense-month-chart";

let cardData = [
  {
    title: "Total student",
    value: "20",
  },
  {
    title: "Total teacher",
    value: "5",
  },
  {
    title: "Expense (current month)",
    value: "700 ৳",
  },
  {
    title: "Average attendance",
    value: "83.4%",
  },
];

function AdminHome() {
  return (
    // <div className="App">
    //   <MobileLayout title="Home">
    <Grid container spacing={3}>
      {cardData.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ width: "100%", backgroundColor: "#FFFFBA" }}>
            <CardContent>
              <Typography align="center" variant="h6">
                {item.title}
              </Typography>
              <Typography align="center" variant="h4">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sm={12} md={6}>
        <StudentMonthChart />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <ExpenseMonthChart />
      </Grid>
    </Grid>
    //   </MobileLayout>
    // </div>
  );
}

export default AdminHome;
