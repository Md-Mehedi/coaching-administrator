import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  OverridableTypeMap,
  DefaultComponentProps,
} from "@mui/material/OverridableComponent";
import { Person } from "../../classes/person-info";
import { getGender } from "./../../classes/person-info";

export interface FieldProps<M extends OverridableTypeMap> {
  field: string;
  value: any;
  fieldProps?: DefaultComponentProps<M>;
  valueProps?: DefaultComponentProps<M>;
}
/**
 * It's a function that takes a generic type parameter, M, which extends the OverridableTypeMap type,
 * and returns a React component that takes a FieldProps<M> object as a parameter
 * @param props - FieldProps<M>
 * @returns A React component.
 */
export function Field<M extends OverridableTypeMap>(props: FieldProps<M>) {
  return (
    props.value && (
      <Grid item container direction="row" spacing={0} alignItems="center">
        <Grid item>
          <Typography sx={{ fontWeight: "bold" }} {...props.fieldProps}>
            {props.field} : &nbsp;{" "}
          </Typography>
        </Grid>
        <Grid item>
          <Typography {...props.valueProps}>{props.value} </Typography>
        </Grid>
      </Grid>
    )
  );
}
export default function About({ person }: { person?: Person }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Basic Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={2}>
            <Field field="Full name" value={person?.fullName} />
            <Field field="Gender" value={getGender(person?.gender)} />
            <Field field="Date of birth" value={person?.dateOfBirth} />
            <Field field="Blood group" value={person?.bloodGroup} />
            <Field field="Nationality" value={person?.nationality} />
            <Field field="Religion" value={person?.religion?.name} />
            <Field
              field="Institution name"
              value={person?.currentQualification?.institution?.name}
            />
            <Field
              field="Group/Department"
              value={person?.currentQualification?.department?.name}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Parent Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={2}>
            <Field field="Father name" value={person?.fatherName} />
            <Field
              field="Father occupation"
              value={person?.fatherOccupation?.name}
            />
            <Field field="Mother name" value={person?.motherName} />
            <Field
              field="Mother occupation"
              value={person?.motherOccupation?.name}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Contact Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Field field="Email" value={person?.email} />
            </Grid>
            {person?.contacts?.map((contact) => (
              <Field
                field={contact?.contactType?.name || "Number"}
                value={contact.number}
              />
            ))}
            {person?.presentAddress && (
              <Field
                field="Present address"
                value={`${person?.presentAddress?.village}, ${person?.presentAddress?.upazila?.name}, ${person?.presentAddress?.upazila?.district?.name}, ${person?.presentAddress?.upazila?.district?.division.name}`}
              />
            )}
            {person?.permanentAddress && (
              <Field
                field="Permanent address"
                value={`${person?.permanentAddress?.village}, ${person?.permanentAddress?.upazila?.name}, ${person?.permanentAddress?.upazila?.district?.name}, ${person?.permanentAddress?.upazila?.district?.division.name}`}
              />
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Exam Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={3}>
            {person?.eduQualifications?.map((qualification) => (
              <Grid item container direction="column" spacing={1}>
                <Grid item>
                  <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                    {qualification.qualificationExam?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Field
                    field="Institution name"
                    value={qualification.institution?.name}
                  />
                </Grid>
                <Grid item>
                  <Field
                    field="Board"
                    value={qualification.institution?.board?.name}
                  />
                </Grid>
                <Grid item>
                  <Field
                    field="Passing year"
                    value={qualification.passingYear}
                  />
                </Grid>
                <Grid item>
                  <Field field="GPA/CGPA" value={qualification.result} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
