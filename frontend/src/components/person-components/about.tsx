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

export default function About() {
  function Field({ field, value }) {
    return (
      <Grid container direction="row" spacing={0} alignItems="center">
        <Grid item>
          <Typography sx={{ fontWeight: "bold" }}>{field} : &nbsp; </Typography>
        </Grid>
        <Grid item>
          <Typography>{value} </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Basic Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Field field="Full name" value="Md. Raju Khan" />
            </Grid>
            <Grid item>
              <Field field="Gender" value="Male" />
            </Grid>
            <Grid item>
              <Field field="Date of birth" value="30/06/2004" />
            </Grid>
            <Grid item>
              <Field field="Blood group" value="O+" />
            </Grid>
            <Grid item>
              <Field field="Nationality" value="Bangladesh" />
            </Grid>
            <Grid item>
              <Field field="Religion" value="Islam" />
            </Grid>
            <Grid item>
              <Field
                field="Institution name"
                value="Kamarpara School and College"
              />
            </Grid>
            <Grid item>
              <Field field="Class roll" value="101" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Parent Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Field field="Father name" value="Md. Jalal Uddin" />
            </Grid>
            <Grid item>
              <Field field="Father occupation" value="Driver" />
            </Grid>
            <Grid item>
              <Field field="Mother name" value="Rina Akter" />
            </Grid>
            <Grid item>
              <Field field="Mother occupation" value="Housewife" />
            </Grid>
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
              <Field field="Email" value="123.attherate@gmail.com" />
            </Grid>
            <Grid item>
              <Field field="Personal number" value="01945551189" />
            </Grid>
            <Grid item>
              <Field field="Father number" value="01756193888" />
            </Grid>
            <Grid item>
              <Field field="Mother number" value="01923559207" />
            </Grid>
            <Grid item>
              <Field
                field="Present address"
                value="Shaplar Mor, Kamrpara, Turag, Dhaka - 1230"
              />
            </Grid>
            <Grid item>
              <Field
                field="Permanent address"
                value="Mostafapur, Madaripur Sadar, Madaripur, Dhaka"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Exam Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={3}>
            <Grid item container direction="column" spacing={1}>
              <Grid item>
                <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                  SSC
                </Typography>
              </Grid>
              <Grid item>
                <Field
                  field="Institution name"
                  value="Uttara High School and College"
                />
              </Grid>
              <Grid item>
                <Field field="Board" value="Dhaka" />
              </Grid>
              <Grid item>
                <Field field="Passing year" value="2018" />
              </Grid>
              <Grid item>
                <Field field="GPA" value="5.00" />
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
