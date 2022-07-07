import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./pages/auth/login";
import ProgramBatchList from "./pages/batch/program-batch-list";
import CreateBatch from "./pages/batch/create-batch";
import CreateProgram from "./pages/batch/create-program";
import Home from "./pages/home/Home";
import Batch, { BatchUpdateStudent } from "./pages/batch/batch";
import { CreateExam, Exam } from "./pages/batch/exam";
import FeesCollection from "./pages/batch/fees-collection";
import AddStudent from "./pages/student/add-student";
import StudentInfo from "./pages/student/student-info";
import { StudentList } from "./pages/student/student-list";
import AddTeacher from "./pages/teacher/add-teacher";
import Test from "./pages/test";
import PageNotFound from "./pages/page-not-found";
import ProgramList from "./pages/program/program-list";
import Dashboard, { dashboardLinks } from "./pages/home/dashboard";
import { ADMIN_LINKS, USER_LINKS } from "./links";

let adminLinks: { link: string; element: JSX.Element | JSX.Element[] }[] = [];
Object.entries(ADMIN_LINKS).map((item) => {
  adminLinks.push({ link: item[1].path, element: item[1].element });
});
let userLinks: { link: string; element: JSX.Element | JSX.Element[] }[] = [];
Object.entries(USER_LINKS).map((item) => {
  userLinks.push({ link: item[1].path, element: item[1].element });
});

export default function Router() {
  {
    console.log("InRoutes");
  }
  return (
    <BrowserRouter>
      <Routes>
        {adminLinks.map((item, idx) => (
          <Route
            key={idx}
            path={item.link}
            element={<Dashboard element={item.element} />}
          />
        ))}
        {userLinks.map((item, idx) => (
          <Route key={idx} path={item.link} element={item.element} />
        ))}
        {/* {dashboardLinks.map((item, idx) => (
          <Route key={idx} path={item} element={<Dashboard link={item} />} />
        ))} */}

        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/auth/login" element={<Login signOut={true} />} />
        <Route path="/auth" element={<Navigate to="login" />} />
        <Route path="/programs" element={<ProgramBatchList />} />
        <Route path="/batch" element={<Batch />} />
        <Route path="/batch-student-update" element={<BatchUpdateStudent />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/create-batch" element={<CreateBatch />} />
        <Route path="/create-program" element={<CreateProgram />} />
        <Route path="/fees-collection" element={<FeesCollection />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}
