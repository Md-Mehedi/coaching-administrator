import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TabLayout, { TabLayoutContent } from "../../layouts/tab-layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import StudentBatchDetails from "./student-batch-list";
import ShortInfo from "../../components/person-components/short-info";
import About from "../../components/person-components/about";
import StudentExamList from "./student-exam-list";

const tabs: TabLayoutContent[] = [
  {
    title: "Exam",
    element: <StudentExamList />,
  },
  {
    title: "About",
    element: <About />,
  },
  {
    title: "Batch",
    element: <StudentBatchDetails />,
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
  const [state, setState] = useState<{ id: any }>({ id: undefined });
  const { id } = useParams();
  useEffect(() => {
    setState({ ...state, id: id });
  }, [state.id]);

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
