import { AddCircleOutline } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import MaterialTable from "material-table";
import React, { useState } from "react";
import { batches, IProgram, students } from "../../data";
import Admin from "../../layouts/admin";
import { programs } from "./../../data";

export default function ProgramBatchList() {
  const [state, setState] = useState({
    programColumns: [
      { title: "Program Name", field: "name", editable: false },
      { title: "Admission Fees", field: "admissionFees", editable: false },
      {
        title: "Start Date",
        field: "startDate",
        editable: false,
        render: (item: IProgram) => <>{item.startDate.toLocaleDateString()}</>,
      },
    ],
    batchColumn: [
      // {
      //   title: "Avatar",
      //   field: "avatar",
      //   editable: false,
      //   render: (item) => (
      //     <Grid container justifyContent="center">
      //       <Avatar
      //         src={item.content}
      //         alt=""
      //         sx={{
      //           border:3,
      //           height:100,
      //           width:100
      //         }}
      //       />
      //     </Grid>
      //   ),
      // },
      { title: "Batch Name", field: "name", editable: false },
      {
        title: "Assigned Teacher",
        field: "assignedTeachers",
        editable: false,
        render: (item) => (
          <>
            {item.assignedTeachers.map((teacherName, index) => (
              <Typography key={index}>{teacherName}</Typography>
            ))}
          </>
        ),
      },
      { title: "Student Count", field: "studentCount", editable: false },
    ],
  });

  return (
    <Admin>
      <Grid container direction="row" spacing={2} alignItems="flex-start">
        <Grid item xs={6}>
          <Grid container direction="column">
            <Grid item container justifyContent="center">
              <Button variant="contained" startIcon={<AddCircleOutline />}>
                Add New Program
              </Button>
            </Grid>
            <Grid item container>
              {programs.map((item) => (
                <Grid item>
                  <Card>
                    <CardActionArea>
                      <Typography variant="h5">{item.name}</Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column">
            <Grid item container justifyContent="center">
              <Button variant="contained" startIcon={<AddCircleOutline />}>
                Add New Batch
              </Button>
            </Grid>
            <Grid item container>
              <MaterialTable
                style={{ width: "100%" }}
                //@ts-ignore
                columns={state.batchColumn.map((item) => ({
                  ...item,
                  align: "center",
                }))}
                title="Batches"
                data={batches}
                options={{
                  paging: batches.length > 10,
                  headerStyle: { textAlign: "center" },
                  actionsColumnIndex: -1,
                  addRowPosition: "first",
                  pageSize: 10,
                }}
                // actions={[
                //   {
                //     icon: "visibility",
                //     tooltip: "see teacher",
                //     onClick: (event, rowData) => {
                //       console.log(rowData);
                //       // history.push(`/profile/${rowData.username}`);
                //     },
                //   },
                // ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Admin>
  );
}
