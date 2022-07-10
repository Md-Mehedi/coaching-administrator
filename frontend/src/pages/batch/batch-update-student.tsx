import { Checkbox, Grid, Avatar } from "@mui/material";
import MaterialTable from "material-table";
import { useState } from "react";
import UpdateButton from "../../components/update-button";
import { students } from "../../data";
import AdminLayout from "../../layouts/admin-layout";

export default function BatchUpdateStudent() {
  const [state, setState] = useState({
    studentsColumn: [
      {
        title: "",
        field: "",
        editable: true,
        render: (item) => (
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        ),
      },
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
    ],
  });
  return (
    <AdminLayout>
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
            // actions={[
            //   {
            //     icon: "visibility",
            //     tooltip: "see teacher",
            //     onClick: (event, rowData) => {
            //       console.log(rowData);
            //       // history.push(`/profile/${rowData.username}`);
            //     },
            //   },
            // ]}
          />
        </Grid>
        <Grid item container>
          <UpdateButton />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
