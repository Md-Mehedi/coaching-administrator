import React, { useEffect, useState } from "react";
import MobileLayout from "../../layouts/mobile";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { StudentMonthChart } from "./student-month-chart";
import { ExpenseMonthChart } from "./expense-month-chart";
import { API } from "./../../api";
import { IncomeMonthChart } from "./income-month-chart";
import { ProgramBatchIncomeChart } from "./program-batch-income-chart";
import Loading from "../../components/loading";

let cardData = [
  {
    title: "Total Student",
    field: "studentCount",
  },
  {
    title: "Total Teacher",
    field: "teacherCount",
  },
  {
    title: "Total Program",
    field: "programCount",
  },
  {
    title: "Total Batch",
    field: "batchCount",
  },
  {
    title: "Total Income",
    field: "totalIncome",
  },
  {
    title: "Total Expense",
    field: "totalExpense",
  },
  // {
  //   title: "Average attendance",
  //   field: "83.4%",
  // },
];
function StyledCard({ title, value }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography align="center" variant="h6">
          {title}
        </Typography>
        <Typography align="center" variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function AdminHome() {
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    API.admin.getCardInfo().then((response) => {
      console.log(response.data);
      setCards(response.data);
      setLoading(false);
    });
  }, []);
  return (
    // <div className="App">
    //   <MobileLayout title="Home">
    <Loading loading={loading}>
      <Grid container direction="column" spacing={2} sx={{ padding: 3 }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {cards &&
            cardData.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StyledCard title={item.title} value={cards[item.field]} />
              </Grid>
            ))}
        </Grid>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={12} md={6}>
            <ExpenseMonthChart />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <IncomeMonthChart />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <StudentMonthChart />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ProgramBatchIncomeChart />
          </Grid>
        </Grid>
      </Grid>
    </Loading>
    //   </MobileLayout>
    // </div>
  );
}

export default AdminHome;
