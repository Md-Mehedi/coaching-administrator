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
import { useNavigate, useParams } from "react-router-dom";
import ShortInfo from "../../components/person-components/short-info";
import About from "../../components/person-components/about";
import WithdrawnHistory from "./withdrawn-history";
import TeacherBatchList from "./teacher-batch-list";
import { useSnackbar } from "notistack";
import { Teacher } from "../../classes/person-info";
import { API } from "../../api";
import { apiCatch, showSnackbar } from "../../tools/helper-functions";
import Loading from "../../components/loading";
import { ADMIN_LINKS } from "./../../links";
import TeacherRoutine from "./teacher-routine";

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
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [state, setState] = useState<{
    teacher: Teacher;
    loading: boolean;
    deleteLoading: boolean;
  }>({
    teacher: new Teacher(),
    loading: true,
    deleteLoading: false,
  });
  useEffect(() => {
    id &&
      API.teacher
        .getById(parseInt(id))
        .then((response) => {
          console.log(response);
          showSnackbar(enqueueSnackbar, response.data, () => {
            setState({
              ...state,
              loading: false,
              teacher: response.data.object,
            });
          });
        })
        .catch((r) => {
          apiCatch(enqueueSnackbar, r);
        });
  }, [id]);
  const tabs: TabLayoutContent[] = [
    {
      title: "About",
      element: <About person={state.teacher.person} />,
    },
    // {
    //   title: "Batch",
    //   element: <TeacherBatchList />,
    // },
    {
      title: "Routine",
      element: <TeacherRoutine teacher={state.teacher} />,
    },
    // {
    //   title: "Withdrawn History",
    //   element: <WithdrawnHistory />,
    // },

    // {
    //   title: "Batch",
    //   element: <StudentBatchDetails />,
    // },
  ];
  function handleUpdateClick() {
    navigate(ADMIN_LINKS.updateTeacher.path, { state: state.teacher });
  }
  function handleDeleteClick() {
    if (id) {
      setState({ ...state, deleteLoading: true });
      API.teacher
        .delete(parseInt(id))
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setState({ ...state, deleteLoading: false });
          navigate(ADMIN_LINKS.teacherList.path);
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
            person={state.teacher.person}
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
