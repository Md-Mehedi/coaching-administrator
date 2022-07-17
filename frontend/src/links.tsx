import { Login } from "./pages/auth/login";
import Batch from "./pages/batch/batch-info";
import ExpenseList from "./pages/financial/expense-list";
import Dashboard from "./pages/home/dashboard";
import Program from "./pages/program/program-info";
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
import Home from "./pages/home/home";
import SubjectList from "./pages/batch/subject-list";
import DuesList from "./pages/financial/dues-list";
import ConfirmAdmin from "./pages/auth/confirm-admin";

export var ADMIN_LINKS = {
  home: { path: "/dashboard/home", element: <Home /> },
  // Admin
  settings: { path: "/dashboard/setting", element: <Settings /> },
  // Student
  studentList: { path: "/dashboard/student-list", element: <StudentList /> },
  addStudent: { path: "/dashboard/add-student", element: <AddStudent /> },
  student: { path: "/dashboard/student", element: <StudentInfo /> },
  // Teacher
  addTeacher: { path: "/dashboard/add-teacher", element: <AddTeacher /> },
  teacherList: { path: "/dashboard/teacher-list", element: <TeacherList /> },
  teacher: { path: "/dashboard/teacher", element: <TeacherInfo /> },
  // Program
  program: { path: "/dashboard/program", element: <Program /> },
  programList: { path: "/dashboard/program-list", element: <ProgramList /> },
  exam: { path: "/dashboard/exam", element: <ExamDetails /> },
  // Batch
  batch: { path: "/dashboard/batch", element: <Batch /> },
  // Subject
  subjectList: { path: "/dashboard/subject-list", element: <SubjectList /> },
  // Financial
  duesList: { path: "/dashboard/dues", element: <DuesList /> },
  expenseList: { path: "/dashboard/expense", element: <ExpenseList /> },
  // Other
  test: { path: "/dashboard/test", element: <TabTest /> },
};

export var USER_LINKS = {
  home: { path: "/home", element: <StudentList /> },
  login: { path: "/auth/login", element: <Login /> },
  register: { path: "/auth/register", element: <Register /> },
  verifyAdmin: {
    path: "/auth/confirm-admin",
    element: <ConfirmAdmin />,
  },
  forgotPassword: { path: "/auth/forgot-password", element: <Login /> },
};
