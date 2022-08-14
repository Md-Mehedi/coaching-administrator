import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ADMIN_LINKS, USER_LINKS } from "./links";
import Filter from "./pages/filter";
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
              element={
                <Filter>
                  <Dashboard element={item.element} />
                </Filter>
              }
            />
          </>
        ))}
        {userLinks.map((item, idx) => (
          <>
            <Route key={idx} path={item.link} element={item.element} />
          </>
        ))}
        <Route path="/dashboard/add-teacher/:id" element={<AddTeacher />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}
