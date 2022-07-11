import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MyTable from "../../components/my-table";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function StudentExamList() {
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },
      {
        title: "Subjects",
        field: "subjectList",
        render: (rowData) => (
          <Typography>
            {rowData.subjectList.map((item, index) =>
              index > 0 ? `, ${item}` : `${item}`
            )}
          </Typography>
        ),
      },
      { title: "Result Date", field: "resultDate" },
    ],
    data: [
      {
        name: "Model Test",
        resultDate: "20-03-2018",
        subjectList: ["Physics", "Chemistry"],
        detailData: [
          {
            subject: "Physics",
            type: "CQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Physics",
            type: "MCQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Chemistry",
            type: "CQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Chemistry",
            type: "MCQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
        ],
      },
      {
        name: "Final Model Test",
        resultDate: "20-03-2018",
        subjectList: ["Physics", "Math"],
        detailData: [
          {
            subject: "Physics",
            type: "CQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Physics",
            type: "MCQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Math",
            type: "CQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Math",
            type: "MCQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
        ],
      },
      {
        name: "Physics-1st-03",
        resultDate: "20-03-2018",
        subjectList: ["Physics"],
        detailData: [
          {
            subject: "Physics",
            type: "CQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Physics",
            type: "MCQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Chemistry",
            type: "CQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Chemistry",
            type: "MCQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
        ],
      },
      {
        name: "Chemistry-1st-03",
        resultDate: "20-03-2018",
        subjectList: ["Physics"],
        detailData: [
          {
            subject: "Physics",
            type: "CQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Physics",
            type: "MCQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
        ],
      },
      {
        name: "Math-1st-03",
        resultDate: "20-03-2018",
        subjectList: ["Physics"],
        detailData: [
          {
            subject: "Physics",
            type: "CQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
          {
            subject: "Physics",
            type: "MCQ",
            mark: 20,
            obtainedMark: 15,
            highestMark: 19.5,
          },
        ],
      },
    ],
    detailPanelColumns: [
      { title: "Subject", field: "subject", defaultGroupOrder: 0 },
      { title: "Exam type", field: "type" },
      { title: "Mark", field: "mark" },
      { title: "Obtained Mark", field: "obtainedMark" },
      { title: "Highest Mark", field: "highestMark" },
    ],
  });
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">HSC-23</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MyTable
          columns={state.columns}
          data={state.data}
          detailPanel={(rowData) => (
            <MyTable
              columns={state.detailPanelColumns}
              data={rowData.detailData}
              options={{ toolbar: false, grouping: true }}
            />
          )}
          onRowClick={(event, rowData, togglePanel) =>
            togglePanel && togglePanel()
          }
        />
      </AccordionDetails>
    </Accordion>
  );
}
