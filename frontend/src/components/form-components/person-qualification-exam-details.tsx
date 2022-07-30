import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { EduQualification } from "../../classes/person-info";
import ExamDetails from "../../pages/exam/exam-info";
import QualificationExamResultField from "./qualifiction-exam-field";
import { updateArray } from "../../tools/helper-functions";

export default function PersonQualification({
  currentQualification,
  onCurrentQualificationChange,
  qualificationInfo,
  onChange,
  verifier,
}: {
  currentQualification?: EduQualification;
  onCurrentQualificationChange?: (enwInfo: EduQualification) => void;
  qualificationInfo?: EduQualification[];
  onChange: (newExamInfo: EduQualification[]) => void;
  verifier?: any;
}) {
  // const [state, setState] = useState<{
  //   examInfo: EduQualification[];
  // }>({
  //   examInfo: [],
  // });
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <QualificationExamResultField
          title="Currently studying"
          qualification={currentQualification}
          onChange={(newQualification) =>
            onCurrentQualificationChange &&
            onCurrentQualificationChange(newQualification)
          }
          hideResult
          hideDeleteButton
          verifier={verifier}
        />
      </Grid>
      {qualificationInfo?.map((item, idx) => (
        <Grid item container>
          <QualificationExamResultField
            title={item?.qualificationExam?.name}
            qualification={item}
            onChange={(newQualification) => {
              onChange(updateArray(qualificationInfo, idx, newQualification));
            }}
            onDelete={() => {
              qualificationInfo?.splice(idx);
              onChange(qualificationInfo);
            }}
            verifier={verifier}
          />
        </Grid>
      ))}
      <Grid item container justifyContent="center">
        <Button
          variant="contained"
          onClick={(event) => {
            onChange([...(qualificationInfo || []), new EduQualification()]);
          }}
        >
          Add More Qualification
        </Button>
      </Grid>
    </Grid>
  );
}
