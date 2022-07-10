import React, { useState } from "react";
import MyTable from "../../components/my-table";
import { students } from "../../data";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "../../links";
import { onRowDelete } from "../../components/my-table";
import DialogLayout from "../../layouts/dialog-layout";
import { Autocomplete, Avatar, Grid } from "@mui/material";
import SearchByNameOrIdField from "../../components/search-by-name-or-id-field";

export default function ProgramEnrolledStudent() {
  const [state, setState] = useState({
    open: false,
    column: [
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
      { title: "Name", field: "fullName" },
      { title: "Enrolled Date", field: "enrolledDate" },
    ],
    data: students.map((item) => ({ ...item, enrolledDate: "30/04/2022" })),
  });
  const navigate = useNavigate();
  return (
    <>
      <MyTable
        data={state.data}
        // @ts-ignore
        columns={state.column}
        onRowClick={(event, rowData) => {
          navigate(ADMIN_LINKS.student.path);
        }}
        addButtonText="Add student"
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
        primaryButtonText="Add"
      >
        <SearchByNameOrIdField />
      </DialogLayout>
    </>
  );
}
