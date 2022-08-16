import {
  InboxOutlined,
  EventAvailable,
  CurrencyBitcoin,
  CurrencyExchange,
} from "@mui/icons-material";
import Header from "../../components/header";
import DrawerLayout, { DrawerLayoutPage } from "../../layouts/drawer-layout";
import WebLayout from "../../layouts/web-layout";
import { ADMIN_LINKS } from "../../links";

console.log("Dashboard ", ADMIN_LINKS);
function DashboardIcon(link) {
  return <img src={process.env.PUBLIC_URL + "/image/" + link} width="40px" />;
}
const dashboard_pages: DrawerLayoutPage[] = [
  {
    icon: DashboardIcon("students.png"),
    title: "Student",
    link: ADMIN_LINKS.studentList.path,
    children: [
      // {
      //   icon: <InboxOutlined />,
      //   title: "All Students",
      //   link: ADMIN_LINKS.studentList.path,
      // },
      // {
      //   icon: <InboxOutlined />,
      //   title: "Add new student",
      //   link: ADMIN_LINKS.addStudent.path,
      // },
    ],
  },
  {
    icon: DashboardIcon("teachers.png"),
    title: "Teacher",
    link: ADMIN_LINKS.teacherList.path,
    children: [
      // {
      //   icon: <InboxOutlined />,
      //   title: "Add teacher",
      //   link: ADMIN_LINKS.addTeacher.path,
      // },
      // {
      //   icon: <InboxOutlined />,
      //   title: "Teacher list",
      //   link: ADMIN_LINKS.teacherList.path,
      // },
    ],
  },
  {
    icon: DashboardIcon("programs.png"),
    title: "Program",
    link: ADMIN_LINKS.programList.path,
    children: [],
  },
  {
    icon: DashboardIcon("subjects.png"),
    title: "Subject",
    link: ADMIN_LINKS.subjectList.path,
    children: [],
  },
  {
    icon: DashboardIcon("rooms.png"),
    title: "Room",
    link: ADMIN_LINKS.roomList.path,
    children: [],
  },
  {
    icon: DashboardIcon("expense.png"),
    title: "Expense",
    link: ADMIN_LINKS.expenseList.path,
    children: [],
  },
  // {
  //   icon: <CurrencyExchange />,
  //   title: "Dues",
  //   link: ADMIN_LINKS.duesList.path,
  //   children: [],
  // },
  {
    icon: DashboardIcon("settings.png"),
    title: "Setting",
    link: ADMIN_LINKS.settings.path,
    children: [],
  },
  // {
  //   icon: <InboxOutlined />,
  //   title: "Test",
  //   link: ADMIN_LINKS.test.path,
  //   children: [],
  // },
  // {
  //   icon: <InboxOutlined />,
  //   title: "AddCustomer",
  //   link: ADMIN_LINKS.addCustomer.path,
  //   children: [],
  // },
];

export const dashboardLinks: string[] = [];

dashboard_pages.map((item) => {
  dashboardLinks.push(item.link);
  item.children.map((childItem) => {
    dashboardLinks.push(childItem.link);
  });
});

export default function Dashboard({
  element,
}: {
  element: JSX.Element | JSX.Element[];
}) {
  return (
    <WebLayout>
      <DrawerLayout pages={dashboard_pages} currentElement={element} />
    </WebLayout>
  );
}
