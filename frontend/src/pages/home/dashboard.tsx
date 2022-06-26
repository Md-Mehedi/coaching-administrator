import { InboxOutlined } from "@mui/icons-material";
import React from "react";
import Header from "../../components/header";
import DrawerLayout, { DrawerLayoutPage } from "../../layouts/drawer-layout";
import CreateBatch from "../batch/create-batch";
import CreateProgram from "../batch/create-program";
import Exam from "../batch/exam";
import { StudentList } from "../student/student-list";
import Test from "../test";
import AddStudent from "./../student/add-student";
import AddTeacher from "./../teacher/add-teacher";

const dashboard_pages: DrawerLayoutPage[] = [
  {
    icon: <InboxOutlined />,
    title: "Student",
    page: <StudentList />,
    link: "/student-list",
    children: [
      {
        icon: <InboxOutlined />,
        title: "All Students",
        page: <StudentList />,
        link: "/student-list",
      },
      {
        icon: <InboxOutlined />,
        title: "Add new student",
        page: <AddStudent />,
        link: "/add-student",
      },
    ],
  },
  {
    icon: <InboxOutlined />,
    title: "Teacher",
    page: <AddTeacher />,
    link: "/add-teacher",
    children: [],
  },
  {
    icon: <InboxOutlined />,
    title: "Test",
    page: <Test />,
    link: "/test",
    children: [],
  },
];

export const dashboardLinks: string[] = [];

dashboard_pages.map((item) => {
  dashboardLinks.push(item.link);
  item.children.map((childItem) => {
    dashboardLinks.push(childItem.link);
  });
});

export default function Dashboard({ link }) {
  return (
    <>
      <Header />
      <DrawerLayout pages={dashboard_pages} currentLink={link} />
    </>
  );
}
