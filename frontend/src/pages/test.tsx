import { Grid, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const array = [1, 2, 3, 4, 5];
function InnerFunction({ item }) {
  const [count, setCount] = useState(0);
  console.log("in inner function : ", item, count);
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item>
        <Button variant="contained" onClick={(event) => setCount(count + 1)}>
          {" "}
          ADD
        </Button>
      </Grid>
      <Grid item>
        <Typography>
          {item} {"->"} count : {count}
        </Typography>
      </Grid>
    </Grid>
  );
}
export default function Test() {
  const [refresh, setRefresh] = useState(true);
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Button variant="outlined" onClick={(event) => setRefresh(!refresh)}>
          Refreshed {refresh ? 1 : 0}
        </Button>
      </Grid>
      {array.map((item) => (
        <Grid item>
          <InnerFunction item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
