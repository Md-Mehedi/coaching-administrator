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
import AdminLayout from "./../../layouts/admin-layout";

console.log("Dashboard ", ADMIN_LINKS);
const dashboard_pages: DrawerLayoutPage[] = [
  {
    icon: <InboxOutlined />,
    title: "Student",
    link: ADMIN_LINKS.studentList.path,
    children: [
      {
        icon: <InboxOutlined />,
        title: "All Students",
        link: ADMIN_LINKS.studentList.path,
      },
      {
        icon: <InboxOutlined />,
        title: "Add new student",
        link: ADMIN_LINKS.addStudent.path,
      },
    ],
  },
  {
    icon: <InboxOutlined />,
    title: "Teacher",
    link: ADMIN_LINKS.teacherList.path,
    children: [
      {
        icon: <InboxOutlined />,
        title: "Add teacher",
        link: ADMIN_LINKS.addTeacher.path,
      },
      {
        icon: <InboxOutlined />,
        title: "Teacher list",
        link: ADMIN_LINKS.teacherList.path,
      },
    ],
  },
  {
    icon: <EventAvailable />,
    title: "Program",
    link: ADMIN_LINKS.programList.path,
    children: [],
  },
  {
    icon: <EventAvailable />,
    title: "Subject",
    link: ADMIN_LINKS.subjectList.path,
    children: [],
  },
  {
    icon: <CurrencyExchange />,
    title: "Expense",
    link: ADMIN_LINKS.expenseList.path,
    children: [],
  },
  {
    icon: <CurrencyExchange />,
    title: "Dues",
    link: ADMIN_LINKS.duesList.path,
    children: [],
  },
  {
    icon: <InboxOutlined />,
    title: "Management",
    link: ADMIN_LINKS.settings.path,
    children: [],
  },
  {
    icon: <InboxOutlined />,
    title: "Test",
    link: ADMIN_LINKS.test.path,
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

export default function Dashboard({
  element,
}: {
  element: JSX.Element | JSX.Element[];
}) {
  return (
    <AdminLayout>
      <DrawerLayout pages={dashboard_pages} currentElement={element} />
    </AdminLayout>
  );
}
