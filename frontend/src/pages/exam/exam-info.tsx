import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Field } from "../../components/person-components/about";
import MyTable from "../../components/my-table";
import TabLayout from "../../layouts/tab-layout";
import TextEditor from "../../components/text-editor";
import DialogLayout from "../../layouts/dialog-layout";
import SearchByNameOrIdField from "../../components/search-by-name-or-id-field";
import AddExam from "./add-exam";
import { onRowDelete, onRowUpdate } from "../../components/my-table";
import { Student } from "../../classes/person-info";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { API } from "../../api";
import { showSnackbar } from "../../tools/helper-functions";
import Loading from "../../components/loading";
import { Exam, ExamSubject } from "../../classes/exam";

function ExamShortInfo({ exam }: { exam: Exam }) {
  const [state, setState] = useState({ open: false });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Grid item container direction="column" alignItems="center" spacing={2}>
          <Grid item container>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Field field="Program name" value={exam.program?.name} />
                  </Grid>
                  <Grid item>
                    <Field field="Exam name" value={exam.name} />
                  </Grid>
                  <Grid item>
                    <Field
                      field="Result date"
                      value={
                        exam.resultDate
                          ? new Date(exam.resultDate).toLocaleString()
                          : "Not published"
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              spacing={2}
            >
              <Grid item>
                <Button
                  variant="contained"
                  onClick={(event) => setState({ ...state, open: true })}
                >
                  Update
                </Button>
                <DialogLayout
                  open={state.open}
                  onClose={(event) => setState({ ...state, open: false })}
                  title="Exam name"
                >
                  <AddExam exam={exam} setExam={(exam) => {}} />
                </DialogLayout>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item container>
            <MyTable
              columns={[
                { title: "Subject", field: "subject" },
                { title: "Date", field: "date" },
                { title: "Teacher", field: "teacher" },
              ]}
              data={[
                { subject: "Physics", date: "27-08-2022", teacher: "Mehedi" },
                {
                  subject: "Chemistry",
                  date: "27-08-2022",
                  teacher: "Mijan",
                },
                { subject: "Biology", date: "27-08-2022", teacher: "Ali" },
              ]}
              options={{
                toolbar: false,
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained">See in calender</Button>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
}

function ExamSubjectInfo({ examSubject }: { examSubject: ExamSubject }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid container>
          {examSubject.examMarks?.map((mark) => (
            <>
              <Grid item xs={6}>
                <Field field="Type" value={mark.examType} />
              </Grid>
              <Grid item xs={6}>
                <Field field="Mark" value={mark.examSubjectMark} />
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9}>
        <Typography variant="h5" sx={{ ml: 1 }}>
          Syllabus
        </Typography>
        <TextEditor readOnly value={examSubject.description} />
      </Grid>
    </Grid>
  );
}

function ExamMarkUpload() {
  return (
    <Grid container spacing={1}>
      {/* <Grid item xs={12}>
        <SearchByNameOrIdField
          selectedStudent={null}
          onChange={function (newStudent: Student | Student[] | null): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Grid> */}
      <Grid item xs={12} sm={6}>
        <TextField fullWidth variant="outlined" label="CQ" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth variant="outlined" label="MCQ" />
      </Grid>
    </Grid>
  );
}

function ExamMark({ examSubject }: { examSubject: ExamSubject }) {
  const [state, setState] = useState({
    column: [
      { title: "ID", field: "id", editable: "never" },
      { title: "Nickname", field: "nickname", editable: "never" },
      { title: "CQ", field: "cq", editable: "always" },
      { title: "MCQ", field: "mcq", editable: "always" },
    ],
    data: [
      { id: 1, nickname: "Aman", cq: 20, mcq: 10 },
      { id: 2, nickname: "Shemu", cq: 21, mcq: 5 },
      { id: 3, nickname: "Sanjida", cq: 10, mcq: 7 },
      { id: 4, nickname: "Mehedi", cq: 14, mcq: 9 },
      { id: 5, nickname: "Nasir", cq: 22, mcq: 7 },
    ],
    uploadDialogOpen: false,
  });
  return (
    <>
      <MyTable
        //@ts-ignore
        columns={state.column}
        data={state.data}
        addButtonText="Upload Mark"
        onAddButtonClick={(event) => {
          setState({ ...state, uploadDialogOpen: true });
        }}
        editable={{
          onRowUpdate: onRowUpdate(state.data, (newData) =>
            setState({ ...state, data: newData })
          ),
          onRowDelete: onRowDelete(state.data, (newData) => {
            console.log(newData);
            setState({ ...state, data: newData });
          }),
        }}
      />
      <DialogLayout
        open={state.uploadDialogOpen}
        title="Final Model Test 2022 - Physics"
        onClose={(event) => setState({ ...state, uploadDialogOpen: false })}
      >
        <ExamMarkUpload />
      </DialogLayout>
    </>
  );
}
function ExamSubjectInTab({ examSubject }: { examSubject: ExamSubject }) {
  return (
    <TabLayout
      tabs={[
        {
          title: "Details Info",
          element: <ExamSubjectInfo examSubject={examSubject} />,
        },
        {
          title: "Student marks",
          element: <ExamMark examSubject={examSubject} />,
        },
      ]}
    />
  );
}
const subjectList = ["Physics", "Chemistry", "Biology"];
export default function ExamInfo() {
  let { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [state, setState] = useState<{
    exam: Exam;
    open: boolean;
    loading: boolean;
    tabs: any;
  }>({
    exam: new Exam(),
    open: false,
    loading: true,
    tabs: [],
  });
  useEffect(() => {
    id &&
      API.exam.get(parseInt(id)).then((response) => {
        showSnackbar(enqueueSnackbar, response.data, () => {
          console.log("in exam useeffect", response.data);
          setState({
            ...state,
            exam: response.data.object,
            loading: false,
            tabs: response.data.object.examSubjects.map((item) => ({
              title: item.subject.name || "",
              element: <ExamSubjectInTab examSubject={item} />,
            })),
          });
        });
      });
  }, []);
  return (
    <Loading loading={state.loading}>
      <Grid container direction="column" spacing={2}>
        <Grid item container>
          <ExamShortInfo exam={state.exam} />
        </Grid>
        <Grid item container>
          <TabLayout noPadding tabs={state.tabs} />
        </Grid>
      </Grid>
    </Loading>
  );
}
