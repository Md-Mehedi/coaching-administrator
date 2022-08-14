import { Login } from "./pages/auth/login";
import Batch from "./pages/batch/batch-info";
import ExpenseList from "./pages/financial/expense-list";
import Dashboard from "./pages/home/dashboard";
import ProgramInfo from "./pages/program/program-info";
import ProgramList from "./pages/program/program-list";
import AddStudent from "./pages/student/add-student";
import StudentInfo from "./pages/student/student-info";
import { StudentList } from "./pages/student/student-list";
import AddTeacher from "./pages/teacher/add-teacher";
import TeacherInfo from "./pages/teacher/teacher-info";
import { TeacherList } from "./pages/teacher/teacher-list";
import Test, { TabTest } from "./pages/test";
import { Register } from "./pages/auth/register";
import Settings from "./pages/settings/settings";
import ExamDetails from "./pages/exam/exam-info";
import AdminHome from "./pages/home/admin-home";
import SubjectList from "./pages/coaching/subject-list";
import DuesList from "./pages/financial/dues-list";
import ConfirmAdmin from "./pages/auth/confirm-admin";
import RoomList from "./pages/coaching/room-list";
import AdminCoachingInput from "./pages/auth/admin-coaching-input";
import Filter from "./pages/filter";
import Home from "./pages/home/home";
import { Navigate } from "react-router-dom";

export var ADMIN_LINKS = {
  home: {
    path: "/dashboard/home",
    element: <Navigate to={"/dashboard/program-list"} />,
  },
  // Admin
  settings: { path: "/dashboard/setting", element: <Settings /> },
  // Student
  studentList: { path: "/dashboard/student-list", element: <StudentList /> },
  addStudent: { path: "/dashboard/add-student", element: <AddStudent /> },
  updateStudent: { path: "/dashboard/update-student", element: <AddStudent /> },
  student: { path: "/dashboard/student", element: <StudentInfo /> },
  studentWithId: { path: "/dashboard/student/:id", element: <StudentInfo /> },
  // Teacher
  addTeacher: { path: "/dashboard/add-teacher", element: <AddTeacher /> },
  updateTeacher: { path: "/dashboard/update-teacher", element: <AddTeacher /> },
  teacherList: { path: "/dashboard/teacher-list", element: <TeacherList /> },
  teacher: { path: "/dashboard/teacher", element: <TeacherInfo /> },
  teacherWithId: { path: "/dashboard/teacher/:id", element: <TeacherInfo /> },
  // Program
  program: { path: "/dashboard/program", element: <ProgramInfo /> },
  programWithId: { path: "/dashboard/program/:id", element: <ProgramInfo /> },
  programList: { path: "/dashboard/program-list", element: <ProgramList /> },
  exam: { path: "/dashboard/exam", element: <ExamDetails /> },
  // Batch
  batch: { path: "/dashboard/batch", element: <Batch /> },
  batchWithId: { path: "/dashboard/batch/:id", element: <Batch /> },
  // Subject
  subjectList: { path: "/dashboard/subject-list", element: <SubjectList /> },
  roomList: { path: "/dashboard/room-list", element: <RoomList /> },
  // Financial
  duesList: { path: "/dashboard/dues", element: <DuesList /> },
  expenseList: { path: "/dashboard/expense", element: <ExpenseList /> },
  // Other
  test: { path: "/dashboard/test", element: <Test /> },
};

export var USER_LINKS = {
  home: { path: "/home", element: <Home /> },
  login: { path: "/auth/login", element: <Login /> },
  register: { path: "/auth/register", element: <Register /> },
  verifyAdmin: {
    path: "/auth/confirm-admin",
    element: <ConfirmAdmin />,
  },
  forgotPassword: { path: "/auth/forgot-password", element: <Login /> },
  adminCoachingInput: {
    path: "/auth/admin-coaching",
    element: (
      <Filter>
        <AdminCoachingInput />
      </Filter>
    ),
  },
};
