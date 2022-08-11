import { Grid, Avatar } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { Batch } from "../../classes/coaching";
import { Student } from "../../classes/person-info";
import MyTable, { onRowDelete } from "../../components/my-table";
import SearchByNameOrIdField from "../../components/search-by-name-or-id-field";
import UpdateButton from "../../components/update-button";
import { students } from "../../data";
import DialogLayout from "../../layouts/dialog-layout";
import { ADMIN_LINKS } from "../../links";

export default function BatchStudents({ batch }: { batch: Batch }) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    columns: [
      { title: "Roll no", field: "id" },
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
      { title: "Name", field: "nickname" },
      {
        title: "Fees",
        field: "fees",
        editable: false,
        render: (item) => (item.fees != 0 ? item.fees : "FREE"),
      },
    ],
    data: students,
  });
  useEffect(() => {
    // API.batch.
  }, []);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <MyTable
          //@ts-ignore
          columns={state.columns}
          title="Enrolled Students"
          data={state.data}
          onRowClick={(event, rowData) => {
            navigate(ADMIN_LINKS.student.path);
          }}
          addButtonText="Add Student"
          onAddButtonClick={(event) => {
            setState({ ...state, open: true });
          }}
          editable={{
            onRowDelete: onRowDelete(state.data, (newData) =>
              setState({ ...state, data: newData })
            ),
          }}
        />
        <DialogLayout
          fullWidth
          open={state.open}
          onClose={(event) => setState({ ...state, open: false })}
          title="Add student"
          saveButtonText="Add"
        >
          <SearchByNameOrIdField
            selectedStudent={null}
            onChange={function (newStudent: Student | Student[] | null): void {
              throw new Error("Function not implemented.");
            }}
          />
        </DialogLayout>
      </Grid>
      <Grid item container>
        <UpdateButton />
      </Grid>
    </Grid>
  );
}
