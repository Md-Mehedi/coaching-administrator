import { AddCircleOutline } from "@mui/icons-material";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import SpecialLink from "../../components/special-link";
import { programs } from "../../data";
import DialogLayout from "../../layouts/dialog-layout";
import { ADMIN_LINKS } from "../../links";
import CreateProgram from "./create-program";

function ProgramCards() {
  return (
    <Grid container spacing={2}>
      {programs.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <SpecialLink href={ADMIN_LINKS.program.path}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Grid
                    container
                    sx={{ height: 130 }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h5">{item.name}</Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </SpecialLink>
        </Grid>
      ))}
    </Grid>
  );
}

export default function ProgramList() {
  const [state, setState] = useState({
    open: false,
  });
  return (
    <Grid container direction="column" spacing={3} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          startIcon={<AddCircleOutline />}
          onClick={(event) => setState({ ...state, open: true })}
        >
          Add New Program
        </Button>
      </Grid>
      <Grid item>
        <ProgramCards />
      </Grid>
      <DialogLayout
        title="Create a program"
        open={state.open}
        onClose={() => setState({ ...state, open: false })}
      >
        <CreateProgram />
      </DialogLayout>
    </Grid>
  );
  // return (
  //   <Admin>
  //     <Grid container direction="row" spacing={2} alignItems="flex-start">
  //       <Grid item xs={6}>
  //         <Grid container direction="column">
  //           <Grid item container justifyContent="center">
  //             <Button variant="contained" startIcon={<AddCircleOutline />}>
  //               Add New Program
  //             </Button>
  //           </Grid>

  //         </Grid>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Grid container direction="column">
  //           <Grid item container justifyContent="center">
  //             <Button variant="contained" startIcon={<AddCircleOutline />}>
  //               Add New Batch
  //             </Button>
  //           </Grid>
  //           <Grid item container>
  //             <MaterialTable
  //               style={{ width: "100%" }}
  //               //@ts-ignore
  //               columns={state.batchColumn.map((item) => ({
  //                 ...item,
  //                 align: "center",
  //               }))}
  //               title="Batches"
  //               data={batches}
  //               options={{
  //                 paging: batches.length > 10,
  //                 headerStyle: { textAlign: "center" },
  //                 actionsColumnIndex: -1,
  //                 addRowPosition: "first",
  //                 pageSize: 10,
  //               }}
  //               // actions={[
  //               //   {
  //               //     icon: "visibility",
  //               //     tooltip: "see teacher",
  //               //     onClick: (event, rowData) => {
  //               //       console.log(rowData);
  //               //       // history.push(`/profile/${rowData.username}`);
  //               //     },
  //               //   },
  //               // ]}
  //             />
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   </Admin>
  // );
}
