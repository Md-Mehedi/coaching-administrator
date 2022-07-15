import { Grid, Avatar, Typography, Button } from "@mui/material";
import MaterialTable from "material-table";
import { useState } from "react";
import SpecialLink from "../../components/special-link";
import UpdateButton from "../../components/update-button";
import { students } from "../../data";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "../../links";
import MyTable from "../../components/my-table";

export function StudentList() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    studentsColumn: [
      { title: "Roll no", field: "id", editable: false },
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
      { title: "Name", field: "nickname", editable: false },
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
          title="Student List"
          // @ts-ignore
          columns={state.studentsColumn}
          data={students}
          onRowClick={(event) => {
            navigate(ADMIN_LINKS.student.path);
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
