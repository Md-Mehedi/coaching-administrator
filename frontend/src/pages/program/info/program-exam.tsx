import React, { useState } from "react";
import MyTable from "../../../components/my-table";
import DialogLayout from "../../../layouts/dialog-layout";
import AddExam from "./add-exam";

export default function ProgramExam() {
  const [state, setState] = useState({
    data: [
      { name: "Physics chap 1", subjectMark: "30", resultDate: "30/05/3002" },
      { name: "Physics chap 1", subjectMark: "30", resultDate: "30/05/3002" },
      { name: "Physics chap 1", subjectMark: "30", resultDate: "30/05/3002" },
    ],
    addDialogOpen: true,
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
        // editable={{
        //   onRowAdd: (rowData) => {
        //     setState({ ...state, addDialogOpen: true });
        //     alert("ok");
        //   },
        // }}
      />
      <DialogLayout
        open={state.addDialogOpen}
        onClose={(event) => setState({ ...state, addDialogOpen: false })}
      >
        <AddExam />
      </DialogLayout>
    </>
  );
}
