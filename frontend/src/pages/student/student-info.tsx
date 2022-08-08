import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TabLayout, { TabLayoutContent } from "../../layouts/tab-layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import StudentBatchDetails from "./student-batch-list";
import ShortInfo from "../../components/person-components/short-info";
import About from "../../components/person-components/about";
import StudentExamList from "./student-exam-list";
import { API } from "../../api";
import { Student } from "../../classes/person-info";
import { apiCatch, showSnackbar } from "../../tools/helper-functions";
import { useSnackbar } from "notistack";
import Loading from "../../components/loading";
import { ADMIN_LINKS } from "../../links";

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
  let { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [state, setState] = useState<{
    student: Student;
    loading: boolean;
    deleteLoading: boolean;
  }>({
    student: new Student(),
    loading: true,
    deleteLoading: false,
  });

  useEffect(() => {
    id &&
      API.student
        .get(parseInt(id))
        .then((response) => {
          console.log("received student", response.data);
          setState({ ...state, loading: false, student: response.data });
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
  }, [id]);

  const tabs: TabLayoutContent[] = [
    {
      title: "About",
      element: <About person={state.student.person} />,
    },
    {
      title: "Exam",
      element: <StudentExamList />,
    },
    {
      title: "Batch",
      element: <StudentBatchDetails />,
    },
  ];
  function handleUpdateClick() {
    navigate(ADMIN_LINKS.updateStudent.path, { state: state.student });
  }
  function handleDeleteClick() {
    if (id) {
      setState({ ...state, deleteLoading: true });
      API.student
        .delete(parseInt(id))
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({ ...state, deleteLoading: false });
          navigate(ADMIN_LINKS.studentList.path);
        })
        .catch((r) => {
          apiCatch(enqueueSnackbar, r);
          setState({ ...state, deleteLoading: false });
        });
    }
  }
  return (
    <Loading loading={state.loading}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <ShortInfo
            person={state.student.person}
            deleteLoading={state.deleteLoading}
            onUpdateClick={handleUpdateClick}
            onDeleteClick={handleDeleteClick}
          />
        </Grid>
        <Grid item>
          <TabLayout tabs={tabs} />
        </Grid>
      </Grid>
    </Loading>
  );
}
