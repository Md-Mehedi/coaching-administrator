import { Grid, Avatar, Typography, Button } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import SpecialLink from "../../components/special-link";
import UpdateButton from "../../components/update-button";
import { students } from "../../data";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "../../links";
import MyTable from "../../components/my-table";
import { API } from "../../api";
import { apiCatch } from "./../../tools/helper-functions";
import { useSnackbar } from "notistack";

export function StudentList() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    API.student
      .getAll()
      .then((response) => {
        console.log(response);
        setState({ ...state, loading: false, students: response.data });
      })
      .catch((r) => apiCatch(enqueueSnackbar, r));
  }, []);
  const [state, setState] = useState({
    loading: true,
    students: [],
    studentsColumn: [
      { title: "Roll no", field: "person.id", editable: false },
      {
        title: "Photo",
        field: "photo",
        editable: false,
        render: (item) => (
          <Grid container justifyContent="center">
            <Avatar
              src={item.content}
              alt=""
              sx={{
                border: 3,
                height: 40,
                width: 40,
              }}
            />
          </Grid>
        ),
      },
      { title: "Name", field: "person.nickName", editable: false },
      {
        title: "Fees",
        field: "fees",
        editable: false,
        render: (item) => (item.fees != 0 ? item.fees : "FREE"),
      },
    ],
  });
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <MyTable
          isLoading={state.loading}
          title="Student List"
          // @ts-ignore
          columns={state.studentsColumn}
          data={state.students}
          onRowClick={(event, rowData) => {
            navigate(ADMIN_LINKS.student.path + "/" + rowData.person.id);
          }}
          addButtonText="Add Student"
          onAddButtonClick={(event) => navigate(ADMIN_LINKS.addStudent.path)}
        />
      </Grid>
      {/* <Grid item container>
        <UpdateButton />
      </Grid> */}
    </Grid>
  );
}
