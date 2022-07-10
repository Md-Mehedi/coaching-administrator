import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Grid,
  Accordion,
  AccordionSummary,
  Avatar,
  Typography,
  AccordionDetails,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import MyTable from "../../components/my-table";
import { studentsHistory } from "../../data";
import { students } from "./../../data";

export default function BatchStudentHistory() {
  const [state, setState] = useState({
    columns: [
      {
        title: "Photo",
        field: "photo",
        render: (rowData) => <Avatar />,
      },
      { title: "Full Name", field: "student.fullName" },
    ],
    data: studentsHistory,
  });
  return (
    <Grid container>
      <MyTable
        columns={state.columns}
        data={state.data}
        title="Student History"
        detailPanel={(rowData) => (
          <Grid container direction="column" spacing={1}>
            {rowData.history.map((itemHistory, index) => (
              <Grid item>
                <Typography>
                  {`Start from ${moment(itemHistory.startDate).format(
                    "d MMMM, YYYY"
                  )} `}
                  {itemHistory.endDate
                    ? `and enrolled until ${moment(itemHistory.endDate).format(
                        "d MMMM, YYYY"
                      )}. `
                    : `and continue till now. `}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
        onRowClick={(event, rowData, togglePanel) =>
          togglePanel && togglePanel()
        }
      />
      {/* {studentsHistory.map((item, index) => (
        <Accordion square sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container direction="row" spacing={5} alignItems="center">
              <Grid item>
                <Avatar />
              </Grid>
              <Grid item>
                <Typography>
                  {item.student.fullName} ({item.student.nickname})
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            
          </AccordionDetails>
        </Accordion>
      ))} */}
    </Grid>
  );
}
