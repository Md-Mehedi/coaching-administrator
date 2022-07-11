import { Grid, Button, Typography } from "@mui/material";
import MaterialTable from "material-table";
import React, { useState } from "react";
import TabLayout from "../layouts/tab-layout";

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
const tabs = [
  { title: "test1", element: <Test /> },
  { title: "test2", element: <Test /> },
];
export default function Test() {
  return (
    <MaterialTable
      title="Non Grouping Field Preview"
      columns={[
        { title: "Name", field: "name", grouping: false },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
        {
          title: "Birth Place",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
        },
      ]}
      data={[
        { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        {
          name: "Zerya Betül",
          surname: "Baran",
          birthYear: 2017,
          birthCity: 34,
        },
      ]}
      options={{
        grouping: true,
        sorting: false,
      }}
    />
  );
}
// export default function Test() {
//   const [refresh, setRefresh] = useState(true);
//   return (
//     <>
//       <Grid container spacing={2} direction="column">
//         <Grid item>
//           <Button variant="outlined" onClick={(event) => setRefresh(!refresh)}>
//             Refreshed {refresh ? 1 : 0}
//           </Button>
//         </Grid>
//         {array.map((item) => (
//           <Grid item>
//             <InnerFunction item={item} />
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// }
export function TabTest() {
  return <TabLayout tabs={tabs} />;
}
