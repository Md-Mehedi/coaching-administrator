import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import TabLayout, { TabLayoutContent } from "../../layouts/tab-layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import About from "./student-about";

const tabs: TabLayoutContent[] = [
  {
    title: "About",
    element: <About />,
  },
];
const data = [
  "Full name",
  "Nickname",
  "Gender",
  "Date of birth",
  "Blood group",
  "Nationality",
  "Religion",
  "Institution name",
  "Class roll",
  "-------------",
  "Father name",
  "Father occupation",
  "Mother name",
  "Mother occupation",
  "-------------",
  "Exam Information",
  "-------------",
  "Email",
  "Contact information",
  "Present Address",
  "Permanent Address",
];

export default function StudentInfo() {
  function ShortInfo() {
    return (
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Avatar sx={{ width: 200, height: 200 }} />
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body1">Full name</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Nickname</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Personal contact</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <ShortInfo />
      </Grid>
      <Grid item>
        <TabLayout tabs={tabs} />
      </Grid>
    </Grid>
  );
}
