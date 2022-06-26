import { Grid, Typography, TextField } from "@mui/material";

export type ExamResultFieldProps = {
  title: string;
};
export default function ExamResultField(props: ExamResultFieldProps) {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Board" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Institution Name" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Passing Year" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Result" />
        </Grid>
      </Grid>
    </Grid>
  );
}
