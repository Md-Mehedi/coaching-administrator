import React from "react";
import MyTable from "../../../components/my-table";
import { students } from "./../../../data";
import { useNavigate } from "react-router-dom";

export default function ProgramEnrolledStudent() {
  const navigate = useNavigate();
  return (
    <MyTable
      data={students.map((item) => ({ ...item, enrolledDate: "30/04/2022" }))}
      column={[
        { title: "Name", field: "fullName" },
        { title: "Enrolled Date", field: "enrolledDate" },
      ]}
      onRowClick={(event, rowData) => {
        navigate("/student");
      }}
      options={{
        toolbar: true,
      }}
      // actions={[
      //   {
      //     icon: "visibility",
      //     tooltip: "See details",
      //     onClick: (rowData) => {
      //       navigate("/student");
      //     },
      //   },
      // ]}
    />
  );
}
