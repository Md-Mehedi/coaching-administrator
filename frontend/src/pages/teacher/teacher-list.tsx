import { Grid, Avatar, Typography, Button } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import SpecialLink from "../../components/special-link";
import UpdateButton from "../../components/update-button";
import { students, teachers } from "../../data";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_LINKS } from "./../../links";
import MyTable from "../../components/my-table";
import Loading from "../../components/loading";
import { API } from "../../api";
import { apiCatch, avatarForTable } from "./../../tools/helper-functions";
import { useSnackbar } from "notistack";
import { Teacher } from "../../classes/person-info";
import { csvTemplate } from "../../tools/csv/csv-template";

export function TeacherList() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    teachers: [],
    columns: [
      {
        title: "ID",
        field: "person.id",
      },
      {
        title: "Photo",
        field: "person.image",
        render: (item) => avatarForTable(item.person.image),
      },
      {
        title: "Full name",
        field: "person.fullName",
      },
      {
        title: "Joining date",
        field: "person.joiningDate",
        render: (rowData) =>
          new Date(rowData.person.joiningDate).toLocaleString(),
      },
      {
        title: "Blood group",
        field: "person.bloodGroup",
      },
      {
        title: "Studying",
        field: "person.currentQualification",
        render: (item) => {
          return `${item.person.currentQualification?.department.name}, ${item.person.currentQualification?.institution.name}`;
        },
      },
      // {
      //   title: "Fees",
      //   field: "fees",
      //   editable: false,
      //   render: (item) => (item.fees != 0 ? item.fees : "FREE"),
      // },
    ],
  });
  useEffect(() => {
    API.teacher
      .getAll()
      .then((response) => {
        setState({ ...state, loading: false, teachers: response.data });
      })
      .catch((r) => {
        apiCatch(enqueueSnackbar, r);
      });
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <MyTable
          isLoading={state.loading}
          title="Teacher List"
          //@ts-ignore
          columns={state.columns}
          data={state.teachers}
          onRowClick={(event, rowData) => {
            //@ts-ignore
            navigate(ADMIN_LINKS.teacher.path + "/" + rowData?.person.id);
          }}
          addButtonText="Add Teacher"
          onAddButtonClick={(event) => navigate(ADMIN_LINKS.addTeacher.path)}
          csvTemplate={csvTemplate.teacher}
          csvTemplateFileName="teacher-list"
          importAPI={API.csvImport.teachers}
        />
      </Grid>
    </Grid>
  );
}
