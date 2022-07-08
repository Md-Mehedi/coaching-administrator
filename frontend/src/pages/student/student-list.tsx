import { Grid, Avatar, Typography, Button } from "@mui/material";
import MaterialTable from "material-table";
import { useState } from "react";
import SpecialLink from "../../components/special-link";
import UpdateButton from "../../components/update-button";
import { students } from "../../data";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "../../links";

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
        <MaterialTable
          style={{ width: "100%" }}
          //@ts-ignore
          columns={state.studentsColumn.map((item) => ({
            ...item,
            align: "center",
          }))}
          title="Enrolled Students"
          data={students}
          options={{
            paging: students.length > 10,
            headerStyle: { textAlign: "center" },
            actionsColumnIndex: -1,
            addRowPosition: "first",
            pageSize: 10,
          }}
          onRowClick={(event) => {
            navigate(ADMIN_LINKS.student.path);
          }}
        />
      </Grid>
      <Grid item container>
        <UpdateButton />
      </Grid>
    </Grid>
  );
}
