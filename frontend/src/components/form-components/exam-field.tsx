import { Grid, Typography, TextField } from "@mui/material";
import { useState } from "react";
import {
  Board,
  EduQualification,
  Institution,
} from "./../../classes/person-info";
import MyTextfield from "./my-textfield";
import DropDown from "./../dropdown";

export type ExamResultFieldProps = {
  title?: string;
  qualification?: EduQualification;
  onChange: (newQualification: EduQualification) => void;
  onDelete: () => void;
  hideResult?: boolean;
};
export default function ExamResultField(props: ExamResultFieldProps) {
  const [state, setState] = useState<{
    boards: Board[];
    selectedBoard?: Board | null;
    institutions: Institution[];
  }>({
    boards: [],
    institutions: [],
  });

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="Board"
            value={
              props?.qualification?.institution?.board || state.selectedBoard
            }
            options={state.boards}
            optionLabel="name"
            onChange={(event, newValue) => {
              setState({ ...state, selectedBoard: newValue });
              props.onChange({
                ...props.qualification,
                institution: undefined,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="Institution Name"
            value={props.qualification?.institution}
            options={state.institutions}
            optionLabel="name"
            onChange={(event, newValue) =>
              props.onChange({
                ...props.qualification,
                institution: newValue || undefined,
              })
            }
          />
        </Grid>
        {!props.hideResult && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <MyTextfield
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
