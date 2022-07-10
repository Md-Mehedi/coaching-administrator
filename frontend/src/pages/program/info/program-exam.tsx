import { AddCircle } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { MTableToolbar } from "material-table";
import React, { useState } from "react";
import MyTable from "../../../components/my-table";
import DialogLayout from "../../../layouts/dialog-layout";
import AddExam from "./add-exam";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "./../../../links";
function updateAddIcon(props, newFunction, stopOldFunction = true) {
  var addIcon = props.actions.find((item) => item.tooltip === "Add");
  var oldFunc = addIcon.onClick;
  console.log(props);
  addIcon.onClick = (event) => {
    newFunction(event);
    !stopOldFunction && oldFunc(event);
  };
  return props;
}
export default function ProgramExam() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    data: [
      { name: "Physics chap 1", subjectMark: "30", resultDate: "30/05/3002" },
      { name: "Physics chap 1", subjectMark: "30", resultDate: "30/05/3002" },
      { name: "Physics chap 1", subjectMark: "30", resultDate: "30/05/3002" },
    ],
    addDialogOpen: false,
  });
  return (
    <>
      <MyTable
        // @ts-ignore
        columns={[
          { title: "Name", field: "name" },
          { title: "Subject-Mark", field: "subjectMark" },
          { title: "Result Date", field: "resultDate" },
        ]}
        data={state.data}
        addButtonText="Add Exam"
        onAddButtonClick={(event) => {
          setState({ ...state, addDialogOpen: true });
        }}
        onRowClick={(event) => {
          navigate(ADMIN_LINKS.exam.path);
        }}
      />
      <DialogLayout
        title="Create Exam"
        open={state.addDialogOpen}
        onClose={(event) => setState({ ...state, addDialogOpen: false })}
      >
        <AddExam />
      </DialogLayout>
    </>
  );
}
