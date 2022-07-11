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
import ShortInfo from "../../components/person-components/short-info";
import About from "../../components/person-components/about";
import WithdrawnHistory from "./withdrawn-history";

const tabs: TabLayoutContent[] = [
  {
    title: "Withdrawn History",
    element: <WithdrawnHistory />,
  },
  {
    title: "About",
    element: <About />,
  },

  // {
  //   title: "Batch",
  //   element: <StudentBatchDetails />,
  // },
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

export default function TeacherInfo() {
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
