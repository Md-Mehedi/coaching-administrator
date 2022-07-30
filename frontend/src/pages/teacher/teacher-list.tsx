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
import { apiCatch } from "./../../tools/helper-functions";
import { useSnackbar } from "notistack";
import { Teacher } from "../../classes/person-info";

export function TeacherList() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    teachers: [],
    columns: [
      { title: "Roll no", field: "person.id", editable: false },
      // {
      //   title: "Photo",
      //   field: "photo",
      //   editable: false,
      //   render: (item) => (
      //     <Grid container justifyContent="center">
      //       <Avatar
      //         src={item.content}
      //         alt=""
      //         sx={{
      //           border: 3,
      //           height: 40,
      //           width: 40,
      //         }}
      //       />
      //     </Grid>
      //   ),
      // },
      { title: "Full name", field: "person.fullName", editable: false },
      { title: "Nickname", field: "person.nickName", editable: false },
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
        apiCatch(r, enqueueSnackbar);
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
        />
      </Grid>
    </Grid>
  );
}
