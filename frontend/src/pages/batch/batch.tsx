import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import MaterialTable from "material-table";
import React, { useState } from "react";
import { moment } from "../../App";
import { batches, IBatch, studentsHistory } from "../../data";
import AdminLayout from "../../layouts/admin-layout";
import TabLayout from "../../layouts/tab-layout";
import UpdateButton from "./../../components/update-button";
import { students } from "./../../data";
import ExamList from "./exam";

const data: IBatch = batches[0];

export function BatchAbout() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>Program name : {data.program?.name}</Typography>
      </Grid>
      <Grid item>
        <Typography>Subject : {data.subject?.name}</Typography>
      </Grid>
      <Grid item>
        <Typography>Monthly fees : {data.monthlyFees}</Typography>
      </Grid>
      <Grid item>
        <Typography>
          {"Assigned teacher(s) : "}
          {data.assignedTeachers.map((item, index) => (
            <>
              {index != 0 ? ", " : ""}
              {item}
            </>
          ))}
        </Typography>
      </Grid>
      <Grid item container>
        <UpdateButton />
      </Grid>
    </Grid>
  );
}

export function BatchStudents() {
  const [state, setState] = useState({
    studentsColumn: [
      { title: "Roll no", field: "id", editable: false },
      {
        title: "Photo",
        field: "photo",
        editable: false,
        render: (item) => (
          <Grid container justifyContent="center">
            <Avatar
              src={item.content}
              alt=""
              sx={{
                border: 3,
                height: 40,
                width: 40,
              }}
            />
          </Grid>
        ),
      },
      { title: "Name", field: "nickname", editable: false },
      {
        title: "Fees",
        field: "fees",
        editable: false,
        render: (item) => (item.fees != 0 ? item.fees : "FREE"),
      },
    ],
  });
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <MaterialTable
          style={{ width: "100%" }}
          //@ts-ignore
          columns={state.studentsColumn.map((item) => ({
            ...item,
            align: "center",
          }))}
          title="Enrolled Students"
          data={students}
          options={{
            paging: students.length > 10,
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
      <Grid item container>
        <UpdateButton />
      </Grid>
    </Grid>
  );
}

export function BatchStudentHistory() {
  return (
    <Grid container>
      {studentsHistory.map((item, index) => (
        <Accordion square sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
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
            <Grid container direction="column" spacing={1}>
              {item.history.map((itemHistory, index) => (
                <Grid item>
                  <Typography>
                    {`Start from ${moment(itemHistory.startDate).format(
                      "d MMMM, YYYY"
                    )} `}
                    {itemHistory.endDate
                      ? `and enrolled until ${moment(
                          itemHistory.endDate
                        ).format("d MMMM, YYYY")}. `
                      : `and continue till now. `}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Grid>
  );
}

export function BatchRoutine() {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </Grid>
      <Grid item>
        <UpdateButton />
      </Grid>
    </Grid>
  );
}

export function BatchUpdateStudent() {
  const [state, setState] = useState({
    studentsColumn: [
      {
        title: "",
        field: "",
        editable: true,
        render: (item) => (
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        ),
      },
      {
        title: "Photo",
        field: "photo",
        editable: false,
        render: (item) => (
          <Grid container justifyContent="center">
            <Avatar
              src={item.content}
              alt=""
              sx={{
                border: 3,
                height: 40,
                width: 40,
              }}
            />
          </Grid>
        ),
      },
      { title: "Name", field: "nickname", editable: false },
    ],
  });
  return (
    <AdminLayout>
      <Grid container direction="column" spacing={2}>
        <Grid item container>
          <MaterialTable
            style={{ width: "100%" }}
            //@ts-ignore
            columns={state.studentsColumn.map((item) => ({
              ...item,
              align: "center",
            }))}
            title="Enrolled Students"
            data={students}
            options={{
              paging: students.length > 10,
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
        <Grid item container>
          <UpdateButton />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export default function Batch() {
  return (
    // <Admin>
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h4">
          {"HSC-23 > "} {data.name}
        </Typography>
      </Grid>
      <Grid item container>
        <TabLayout
          tabs={[
            {
              title: "About",
              element: <BatchAbout />,
            },
            {
              title: "Students",
              element: <BatchStudents />,
            },
            {
              title: "Students History",
              element: <BatchStudentHistory />,
            },
            {
              title: "Exam",
              element: <ExamList />,
            },
            {
              title: "Routine",
              element: <BatchRoutine />,
            },
          ]}
        />
      </Grid>
    </Grid>
    // </Admin>
  );
}
