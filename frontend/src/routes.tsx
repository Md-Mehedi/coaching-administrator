import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./pages/auth/Login";
import ProgramBatchList from "./pages/batch/program-batch-list";
import CreateBatch from "./pages/batch/create-batch";
import CreateProgram from "./pages/batch/create-program";
import Home from "./pages/home/Home";
import Batch from "./pages/batch/batch";

function Ok() {
  return <h1>Only ok</h1>;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/auth/login" element={<Login signOut={true} />} />
        <Route path="/auth" element={<Navigate to="login" />} />
        <Route path="/programs" element={<ProgramBatchList />} />
        <Route path="/batch" element={<Batch />} />
        <Route path="/create-batch" element={<CreateBatch />} />
        <Route path="/create-program" element={<CreateProgram />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}
