import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ADMIN_LINKS, USER_LINKS } from "./links";
import Dashboard from "./pages/home/dashboard";
import PageNotFound from "./pages/page-not-found";
import AddTeacher from "./pages/teacher/add-teacher";

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
          <>
            <Route
              key={idx}
              path={item.link}
              element={<Dashboard element={item.element} />}
            />
            {/* <Route
              key={idx + 100}
              path={item.link + "/:id"}
              element={<Dashboard element={item.element} />}
            /> */}
          </>
        ))}
        {userLinks.map((item, idx) => (
          <>
            <Route key={idx} path={item.link} element={item.element} />
          </>
        ))}
        {/* {dashboardLinks.map((item, idx) => (
          <Route key={idx} path={item} element={<Dashboard link={item} />} />
        ))} */}

        <Route path="/dashboard/add-teacher/:id" element={<AddTeacher />} />
        <Route path="/" element={<Navigate to="dashboard/home" />} />
        {/* <Route path="/auth/login" element={<Login signOut={true} />} />
        <Route path="/auth" element={<Navigate to="login" />} />
        <Route path="/programs" element={<ProgramBatchList />} />
        <Route path="/batch" element={<Batch />} />
        <Route path="/batch-student-update" element={<BatchUpdateStudent />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/create-batch" element={<CreateBatch />} />
        <Route path="/create-program" element={<CreateProgram />} />
        <Route path="/fees-collection" element={<FeesCollection />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}
