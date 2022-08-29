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
import { apiCatch, showSnackbar } from "../../tools/helper-functions";
import Loading from "../../components/loading";
import { Exam, ExamSubject, Result } from "../../classes/exam";
import { API } from "./../../api";
import { EnrolledProgram } from "./../../classes/coaching";

function ExamShortInfo({
  exam,
  setExam,
}: {
  exam: Exam;
  setExam: (exam: Exam) => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
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
                  onSaveButtonClick={(event) =>
                    API.exam
                      .update(exam)
                      .then((response) => {
                        showSnackbar(enqueueSnackbar, response.data, () => {
                          setState({ ...state, open: false });
                        });
                      })
                      .catch((r) => apiCatch(enqueueSnackbar, r))
                  }
                >
                  <AddExam exam={exam} setExam={setExam} />
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

function ExamMark({
  programId,
  examSubject,
}: {
  programId: number;
  examSubject: ExamSubject;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState<{
    column: any[];
    data: Result[];
    uploadDialogOpen: boolean;
  }>({
    column: [
      { title: "ID", field: "student.person.id", editable: "never" },
      {
        title: "Nickname",
        field: "student.person.nickName",
        editable: "never",
      },
    ],
    data: [],
    uploadDialogOpen: false,
  });
  useEffect(() => {
    let type = examSubject.examMarks
      ? examSubject.examMarks.map((item) => ({
          title: `${item.examType} (${item.examSubjectMark})`,
          field: item.examType,
          editable: "always",
        }))
      : [];
    console.log("in useeffect type", type);
    programId != 0 &&
      API.program.getEnrolledStudents(programId).then((response) => {
        let students: EnrolledProgram[] = response.data.object;
        console.log("exa student list", students);
        setState({
          ...state,
          data: students.map((enroll) => ({
            student: enroll.student,
          })),
          column: [...state.column, ...type],
        });
      });
    // API.exam
  }, [programId]);

  return (
    <>
      <MyTable
        //@ts-ignore
        columns={state.column}
        data={state.data}
        // addButtonText="Upload Mark"
        // onAddButtonClick={(event) => {
        //   setState({ ...state, uploadDialogOpen: true });
        // }}
        editable={{
          onRowUpdate: onRowUpdate(state.data, (newData) =>
            setState({ ...state, data: newData })
          ),
          onRowDelete: onRowDelete(state.data, (newData) => {
            console.log(newData);
            setState({ ...state, data: newData });
          }),
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                let newData: Result[] = [];
                for (let i in changes) {
                  newData.push(changes[i].newData);
                }
                console.log("in bulk update", changes);
                setState({
                  ...state,
                  data: newData,
                });
                resolve(1);
                enqueueSnackbar("Updated successfully", { variant: "success" });
              }, 100);
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
function ExamSubjectInTab({
  programId,
  examSubject,
}: {
  programId: number;
  examSubject: ExamSubject;
}) {
  return (
    <TabLayout
      tabs={[
        {
          title: "Details Info",
          element: <ExamSubjectInfo examSubject={examSubject} />,
        },
        {
          title: "Student marks",
          element: <ExamMark programId={programId} examSubject={examSubject} />,
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
              element: (
                <ExamSubjectInTab
                  programId={response.data.object.program?.id || 0}
                  examSubject={item}
                />
              ),
            })),
          });
        });
      });
  }, []);
  return (
    <Loading loading={state.loading}>
      <Grid container direction="column" spacing={2}>
        <Grid item container>
          <ExamShortInfo
            exam={state.exam}
            setExam={(exam) => setState({ ...state, exam: exam })}
          />
        </Grid>
        <Grid item container>
          <TabLayout noPadding tabs={state.tabs} />
        </Grid>
      </Grid>
    </Loading>
  );
}
