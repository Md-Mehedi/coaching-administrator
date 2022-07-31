import { Grid, Typography, TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Board,
  EduQualification,
  Institution,
  QualificationExam,
  Department,
} from "../../classes/person-info";
import MyTextfield from "./my-textfield";
import DropDown from "../dropdown";
import { API } from "../../api";
import { Cancel } from "@mui/icons-material";
import { emptyFieldChecking } from "./../../tools/helper-functions";

export type QualificationExamResultFieldProps = {
  title?: string;
  qualification?: EduQualification;
  onChange: (newQualification: EduQualification) => void;
  onDelete?: () => void;
  hideResult?: boolean;
  hideDeleteButton?: boolean;
  verifier?: any;
};
export default function QualificationExamResultField(
  props: QualificationExamResultFieldProps
) {
  const [exams, setExams] = useState<QualificationExam[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  async function loadDepartments() {
    const res = await API.qualification.getDepartments();
    const { data } = await res;
    console.log(data);
    setDepartments(data);
  }
  async function loadBoards() {
    const res = API.qualification.getBoardList();
    const { data } = await res;
    setBoards(data);
  }
  async function loadQualificationExams() {
    const res = API.qualification.getExamList();
    const { data } = await res;
    setExams(data);
  }
  useEffect(() => {
    loadBoards();
    loadQualificationExams();
    loadDepartments();
  }, []);
  function loadInstitutions(board: Board | null) {
    board &&
      API.qualification.institution
        .getListByBoard(board.id)
        .then((response) => {
          setInstitutions(response.data);
        });
  }

  props.verifier.current = (enqueueSnackbar) => {
    let errorVerifyField = [
      { label: "Exam name", field: props.qualification?.qualificationExam },
      { label: "Board", field: props.qualification?.institution?.board },
      {
        label: "Institution name",
        field: props.qualification?.institution,
      },
      { label: "Group/Department", field: props.qualification?.department },
    ];
    return emptyFieldChecking(enqueueSnackbar, errorVerifyField);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6">{props.title || "Exam name"}</Typography>
        </Grid>
        {!props.hideDeleteButton && (
          <Grid item>
            <IconButton onClick={props.onDelete}>
              <Cancel />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            required
            label="Exam name"
            value={props?.qualification?.qualificationExam}
            options={exams}
            optionLabel="name"
            onChange={(event, newValue) => {
              props.onChange({
                ...props.qualification,
                qualificationExam: newValue || undefined,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            required
            label="Board"
            value={props?.qualification?.institution?.board || selectedBoard}
            options={boards}
            optionLabel="name"
            onChange={(event, newValue) => {
              setSelectedBoard(newValue || undefined);
              loadInstitutions(newValue);
              props.onChange({
                ...props.qualification,
                institution: undefined,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            required
            label="Institution Name"
            value={props.qualification?.institution}
            options={institutions}
            optionLabel="name"
            onChange={(event, newValue) => {
              newValue = { ...newValue, board: selectedBoard };
              props.onChange({
                ...props.qualification,
                institution: newValue || undefined,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            required
            label="Group / Department"
            value={props.qualification?.department}
            options={departments}
            optionLabel="name"
            onChange={(event, newValue) =>
              props.onChange({
                ...props.qualification,
                department: newValue || undefined,
              })
            }
          />
        </Grid>
        {!props.hideResult && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <MyTextfield
                required
                label="Passing Year"
                type="number"
                inputProps={{
                  min: 1900,
                  max: 2022,
                  step: 1,
                }}
                value={props.qualification?.passingYear}
                onChange={(event) =>
                  props.onChange({
                    ...props.qualification,
                    passingYear: parseInt(event.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MyTextfield
                label="Result"
                type="number"
                inputProps={{
                  min: 0,
                  max: 5,
                  step: 0.01,
                }}
                value={props.qualification?.result}
                onChange={(event) =>
                  props.onChange({
                    ...props.qualification,
                    result: parseFloat(event.target.value),
                  })
                }
              />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}
