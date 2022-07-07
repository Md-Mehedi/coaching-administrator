import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SaveCancelButtons from "../../components/save-cancel-buttons";
import TextEditor from "../../components/text-editor";
import Event from "./event";
import MaterialTable from "material-table";
import { exams, examTypes, teachers } from "./../../data";
import { AddCircleOutline } from "@mui/icons-material";
import { moment } from "../../App";
import AdminLayout from "../../layouts/admin-layout";
import Events from "./events";

export function CreateExam() {
  const [state, setState] = useState({
    examType: 0,
  });
  return (
    <AdminLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="Exam Name" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Syllabus</Typography>
          <TextEditor />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Mark Distribution" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Exam type</InputLabel>
                    <Select
                      value={state.examType}
                      label="Teacher"
                      onChange={(event) => {
                        setState({
                          ...state,
                          examType: event.target.value as number,
                        });
                        console.log(event);
                      }}
                    >
                      <MenuItem value={0}>-- Select Exam Type --</MenuItem>
                      {examTypes.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth variant="outlined" label="Mark" />
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Button variant="contained" startIcon={<AddCircleOutline />}>
                    Add More Type
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Events disableMoreClass disableRepeat />
        </Grid>
        <Grid item container>
          <SaveCancelButtons />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
export function Exam() {
  const exam = exams[0];
  return (
    <AdminLayout>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="subtitle1">{`Exam name : ${exam.name}`}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{`Syllabus : ${exam.syllabus}`}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            {`Mark distribution : `}
            {exam.mark.map((item, index) => (
              <>
                {" "}
                {index != 0
                  ? ", "
                  : ""} {`${item.examType} (${item.mark})`}{" "}
              </>
            ))}
          </Typography>
        </Grid>
        <Grid item container direction="row" spacing={2}>
          <Grid item>
            <Button variant="contained">Update</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Routine</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Upload mark / Result</Button>
          </Grid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
export default function ExamList() {
  const [state, setState] = useState({
    examColumn: [
      { title: "Name", field: "name", editable: false },
      {
        title: "Mark Distribution",
        field: "mark",
        editable: false,
        render: (item) =>
          item.mark.map((i) => (
            <Typography>{`${i.examType} : ${i.mark}`}</Typography>
          )),
      },
      {
        title: "Result Date",
        field: "resultDate",
        editable: false,
        render: (item) => <>{moment(item.resultDate).format("d MMMM, YYYY")}</>,
      },
    ],
  });
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="center">
        <Button variant="contained" startIcon={<AddCircleOutline />}>
          Add New Exam
        </Button>
      </Grid>
      <Grid item container>
        <MaterialTable
          style={{ width: "100%" }}
          //@ts-ignore
          columns={state.examColumn.map((item) => ({
            ...item,
            align: "center",
          }))}
          title="Enrolled Students"
          data={exams}
          options={{
            paging: exams.length > 10,
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
    </Grid>
  );
}
