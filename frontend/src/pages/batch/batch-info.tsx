// import ExamList from "./exam-list";
import BatchRoutine from "./batch-routine";
import BatchStudentHistory from "./batch-student-history";
import BatchStudents from "./batch-student-list";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { IBatch, batches } from "../../data";
import TabLayout from "../../layouts/tab-layout";
import { Field } from "../../components/person-components/about";
import BatchAttendance from "./batch-attendance";

const data: IBatch = batches[0];

const tabs = [
  {
    title: "Attendance",
    element: <BatchAttendance />,
  },
  {
    title: "Students",
    element: <BatchStudents />,
  },
  {
    title: "Students History",
    element: <BatchStudentHistory />,
  },
  {
    title: "Routine",
    element: <BatchRoutine />,
  },
];
export default function Batch() {
  return (
    // <Admin>
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Grid item container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h4">
                    {"Batch : "} {data.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Field field="Program name" value={data.program?.name} />
                </Grid>
                <Grid item>
                  <Field field="Subject" value={data.subject?.name} />
                </Grid>
                <Grid item>
                  <Field field="Monthly fees" value={data.monthlyFees} />
                </Grid>
                <Grid item>
                  <Field
                    field="Assigned teacher(s)"
                    value={data.assignedTeachers.map((item, index) => (
                      <>
                        {index != 0 ? ", " : ""}
                        {item}
                      </>
                    ))}
                  />
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
      </Grid>

      <Grid item container>
        <TabLayout tabs={tabs} />
      </Grid>
    </Grid>
    // </Admin>
  );
}
