import React, { useState } from "react";
import { Grid } from "@mui/material";
import { EduQualification } from "../../classes/person-info";
import ExamDetails from "./../../pages/exam/exam-info";
import ExamResultField from "./exam-field";
import { updateArray } from "../../tools/helper-functions";

export default function PersonExamDetails({
  examInfo,
  onChange,
}: {
  examInfo?: EduQualification[];
  onChange: (newExamInfo: EduQualification[]) => void;
}) {
  // const [state, setState] = useState<{
  //   examInfo: EduQualification[];
  // }>({
  //   examInfo: [],
  // });
  return (
    <Grid container direction="column" spacing={2}>
      {examInfo?.map((item, idx) => (
        <Grid item container>
          <ExamResultField
            title={item?.exam?.name}
            qualification={item}
            onChange={(newQualification) => {
              onChange(updateArray(examInfo, idx, newQualification));
            }}
            onDelete={() => onChange(examInfo?.splice(idx))}
          />
        </Grid>
      ))}
    </Grid>
  );
}
