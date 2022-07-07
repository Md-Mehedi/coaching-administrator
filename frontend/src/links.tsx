import { Login } from "./pages/auth/login";
import Batch from "./pages/batch/batch";
import ExpenseList from "./pages/expense-list";
import Dashboard from "./pages/home/dashboard";
import Program from "./pages/program/program";
import ProgramList from "./pages/program/program-list";
import AddStudent from "./pages/student/add-student";
import StudentInfo from "./pages/student/student-info";
import { StudentList } from "./pages/student/student-list";
import AddTeacher from "./pages/teacher/add-teacher";
import TeacherInfo from "./pages/teacher/teacher-info";
import { TeacherList } from "./pages/teacher/teacher-list";
import Test from "./pages/test";
import { Register } from "./pages/auth/register";

export var ADMIN_LINKS = {
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
  // Batch
  batch: { path: "/dashboard/batch", element: <Batch /> },
  // Other
  expenseList: { path: "/dashboard/expense", element: <ExpenseList /> },
  test: { path: "/dashboard/test", element: <Test /> },
};

export var USER_LINKS = {
  home: { path: "/home", element: <StudentList /> },
  login: { path: "/auth/login", element: <Login signOut /> },
  register: { path: "/auth/register", element: <Register /> },
};
