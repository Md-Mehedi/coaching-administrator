import {
  ArrowDownward,
  DeleteForever,
  AddCircleOutline,
} from "@mui/icons-material";
import {
  Grid,
  TextField,
  Accordion,
  AccordionSummary,
  IconButton,
  AccordionDetails,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API } from "../../api";
import { Subject } from "../../classes/coaching";
import { Exam, ExamSubject } from "../../classes/exam";
import DropDown from "../../components/dropdown";
import TextEditor from "../../components/text-editor";
import Events from "../class-time/events";
import { ExamMark } from "./../../classes/exam";
import MyTextfield from "./../../components/form-components/my-textfield";

function ExamTypeMark({
  type,
  onChange,
}: {
  type: ExamMark;
  onChange: (type: ExamMark) => void;
}) {
  const [state, setState] = useState({
    type: null,
    mark: "0",
  });
  const data = [
    { value: 1, label: "CQ" },
    { value: 2, label: "MCQ" },
    { value: 3, label: "Other" },
    { value: 4, label: "Short Question" },
  ];
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <DropDown
          label="Exam Type"
          value={data.find((item) => item.label == type.examType)}
          onChange={(event, newValue) => {
            onChange({ ...type, examType: newValue ? newValue.label : "" });
          }}
          options={data}
          optionLabel="label"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MyTextfield
          label="Mark"
          value={type.examSubjectMark}
          onChange={(event) => {
            onChange({
              ...type,
              examSubjectMark: parseInt(event.target.value),
            });
          }}
        />
      </Grid>
    </Grid>
  );
}
function ExamSubjectDetails({
  subjectList,
  subject,
  onChange,
  onDelete,
}: {
  subjectList: Subject[];
  subject: ExamSubject;
  onChange: (subject: ExamSubject) => void;
  onDelete: () => void;
}) {
  const [state, setState] = useState({
    subject: null,
  });
  return (
    <Accordion sx={{ backgroundColor: "#DFF6F8" }}>
      <AccordionSummary
        expandIcon={<ArrowDownward />}
        // sx={{ backgroundColor: "#ACE1E1" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={10}>
            <DropDown
              label="Subject"
              value={subject.subject}
              onChange={(event, newValue) => {
                onChange({ ...subject, subject: newValue || undefined });
                event.preventDefault();
                event.stopPropagation();
              }}
              options={subjectList}
              optionLabel="name"
            />
          </Grid>
          <Grid item>
            <IconButton onClick={onDelete}>
              <DeleteForever />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={12}>
              <Grid container direction="column" spacing={1}>
                {subject.examMarks?.map((examTypeMark, idx) => (
                  <Grid item>
                    <ExamTypeMark
                      type={examTypeMark}
                      onChange={(newType) => {
                        let marks = subject.examMarks
                          ? [...subject.examMarks]
                          : [];
                        marks[idx] = newType;
                        onChange({ ...subject, examMarks: marks });
                      }}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} container justifyContent="center">
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={(event) => {
                      onChange({
                        ...subject,
                        examMarks: subject.examMarks
                          ? [...subject.examMarks, new ExamMark()]
                          : [new ExamMark()],
                      });
                    }}
                  >
                    Add More Type
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6">Syllabus</Typography>
              <TextEditor
                value={subject.description}
                onChange={(newValue) =>
                  onChange({ ...subject, description: newValue })
                }
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Events disableMoreClass disableRepeat />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default function AddExam({
  exam,
  setExam,
}: {
  exam: Exam;
  setExam: (exam: Exam) => void;
}) {
  const [state, setState] = useState<{ subjects: Subject[] }>({
    subjects: [],
  });
  useEffect(() => {
    API.subject.getAll().then((response) => {
      setState({ ...state, subjects: response.data });
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MyTextfield
          label="Exam Name"
          value={exam.name}
          onChange={(event) => setExam({ ...exam, name: event.target.value })}
        />
      </Grid>
      {exam.examSubjects?.map((subject, idx) => (
        <Grid item>
          <ExamSubjectDetails
            subjectList={state.subjects}
            subject={subject}
            onChange={(subject) => {
              let subjects = exam.examSubjects ? [...exam.examSubjects] : [];
              subjects[idx] = subject;
              setExam({ ...exam, examSubjects: subjects });
            }}
            onDelete={() => {
              let subjects = exam.examSubjects?.filter(
                (item, index) => index != idx
              );
              setExam({ ...exam, examSubjects: subjects });
            }}
          />
        </Grid>
      ))}
      <Grid item xs={12} container justifyContent="center">
        <Button
          variant="contained"
          startIcon={<AddCircleOutline />}
          onClick={(event) => {
            setExam({
              ...exam,
              examSubjects: exam.examSubjects
                ? [...exam.examSubjects, new ExamSubject()]
                : [new ExamSubject()],
            });
          }}
        >
          Add More Subject
        </Button>
      </Grid>
    </Grid>
  );
}
