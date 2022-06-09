import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./pages/auth/Login";
import Home from "./pages/home/Home";

function Ok() {
  return <h1>Only ok</h1>;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="auth/login" element={<Login signOut={true} />} />
        <Route path="auth" element={<Navigate to="login" />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}
