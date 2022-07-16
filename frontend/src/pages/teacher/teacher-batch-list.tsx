import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTable, {
  columnDateInput,
  onRowUpdate,
} from "../../components/my-table";
import { ADMIN_LINKS } from "../../links";

export default function TeacherBatchList() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    columns: [
      {
        title: "Name",
        field: "subject",
      },
      {
        title: "Assigned Date",
        field: "assignedDate",
        type: "date",
        initialEditValue: new Date(),
        editComponent: columnDateInput("Assigned Date"),
      },
      {
        title: "Pay Per Class",
        field: "payPerClass",
      },
      {
        title: "Current Month Class Count",
        field: "curMonthClassCount",
      },
    ],
    data: [
      {
        assignedDate: "29-09-2019",
        curMonthClassCount: 10,
        subject: "Physics",
        payPerClass: 800,
      },
      {
        assignedDate: "29-09-2019",
        curMonthClassCount: 10,
        subject: "Chemistry",
        payPerClass: 800,
      },
      {
        assignedDate: "29-09-2019",
        curMonthClassCount: 10,
        subject: "Math",
        payPerClass: 800,
      },
      {
        assignedDate: "29-09-2019",
        curMonthClassCount: 10,
        subject: "Biology",
        payPerClass: 800,
      },
    ],
  });
  return (
    <Grid container direction="column">
      <Accordion>
        <AccordionSummary>
          <Grid
            container
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6">HSC-23 Program</Typography>
            </Grid>
            {/* <Grid item>
              <Typography align="center">
                Admit at <br />
                30/05/2022
              </Typography>
            </Grid>
            <Grid item>
              <AddBatch />
            </Grid> */}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <MyTable
            title="HSC 2023"
            //@ts-ignore
            columns={state.columns}
            data={state.data}
            onRowClick={(event) => navigate(ADMIN_LINKS.batch.path)}
            editable={{
              onRowUpdate: onRowUpdate(state.data, (newData) =>
                setState({ ...state, data: newData })
              ),
            }}
            detailPanel={(rowData) => (
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>
                    From 28-09-2019 to 18-02-2020 : 500 TK / class
                  </Typography>
                  <Typography>
                    From 28-09-2019 to 18-02-2020 : 500 TK / class
                  </Typography>
                  <Typography>
                    From 28-09-2019 to 18-02-2020 : 500 TK / class
                  </Typography>
                </Grid>
              </Grid>
            )}
            // actions={[
            //   {
            //     icon: (rowData) => <RemoveCircle />,
            //     tooltip: "Remove from batch",
            //     onClick: (event, rowData) => {
            //       console.log(rowData);
            //     },
            //   },
            // ]}
          />
          <Grid container direction="column">
            {/* <Grid
              item
              container
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Batch name</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteForever />}
                  onClick={(event) => {}}
                >
                  Remove
                </Button>
              </Grid>
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}
