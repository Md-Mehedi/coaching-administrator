import { AddCircle } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { MTableToolbar } from "material-table";
import React, { useEffect, useState } from "react";
import MyTable from "../../components/my-table";
import DialogLayout from "../../layouts/dialog-layout";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "../../links";
import AddExam from "../exam/add-exam";
import { Exam } from "../../classes/exam";
import { API } from "./../../api";
import { Program } from "../../classes/coaching";
import { showSnackbar } from "../../tools/helper-functions";
import { useSnackbar } from "notistack";
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
export default function ProgramExam({ program }: { program: Program }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState<{
    column: any[];
    data: Exam[];
    addDialogOpen: boolean;
    newExam: Exam;
  }>({
    column: [
      { title: "ID", field: "id" },
      { title: "Name", field: "name" },
      {
        title: "Subject-Mark",
        field: "subjectMark",
        render: (rowData: Exam) => (
          <Typography>
            {rowData.examSubjects?.map((subject, idx) =>
              idx > 0
                ? `, ${subject.subject?.name}`
                : `${subject.subject?.name}`
            )}
          </Typography>
        ),
      },
      {
        title: "Result Date",
        field: "resultDate",
        render: (rowData: Exam) =>
          rowData.resultDate ? (
            new Date(rowData.resultDate)
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>Not published</Typography>
          ),
      },
    ],
    data: [],
    addDialogOpen: false,
    newExam: new Exam(),
  });
  useEffect(() => {
    program.id &&
      API.exam.getAllByProgram(program.id).then((response) => {
        console.log("in exam list useeffect");
        setState({ ...state, data: response.data.object });
      });
  }, [program]);
  function handleNewExamSaveClicked(event) {
    state.newExam.program = program;
    console.log(state.newExam);
    API.exam.add(state.newExam).then((response) => {
      showSnackbar(enqueueSnackbar, response.data);
    });
  }
  return (
    <>
      <MyTable
        // @ts-ignore
        columns={state.column}
        data={state.data}
        addButtonText="Add Exam"
        onAddButtonClick={(event) => {
          setState({ ...state, addDialogOpen: true });
        }}
        onRowClick={(event, rowData) => {
          rowData?.id && navigate(ADMIN_LINKS.exam.path + "/" + rowData.id);
        }}
      />
      <DialogLayout
        title="Create Exam"
        open={state.addDialogOpen}
        onClose={(event) => setState({ ...state, addDialogOpen: false })}
        onSaveButtonClick={handleNewExamSaveClicked}
      >
        <AddExam
          exam={state.newExam}
          setExam={(newExam) => setState({ ...state, newExam: newExam })}
        />
      </DialogLayout>
    </>
  );
}
