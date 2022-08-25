import axios from "axios";
import { Admin, Religion, Student, Teacher } from "./classes/person-info";
import createQueryParam from "./tools/create-query-param";
import {
  Batch,
  ClassTime,
  Coaching,
  Expense,
  Program,
  Room,
  Subject,
} from "./classes/coaching";
import AuthService from "./services/auth-service";

const HOST = "http://localhost:7982";

function post(url, body = {}, param = {}) {
  return axios.post(
    HOST + url + createQueryParam(param),
    body,
    AuthService.getHeaders()
  );
}
function postParam(url, param) {
  return post(url, {}, param);
}
function postBody(url, body) {
  return post(url, body);
}
function put(url, body) {
  return axios.put(HOST + url, body, AuthService.getHeaders());
}
function get(url, param = {}) {
  return axios.get(
    HOST + url + createQueryParam(param),
    AuthService.getHeaders()
  );
}
function del(url, param = {}) {
  return axios.delete(
    HOST + url + createQueryParam(param),
    AuthService.getHeaders()
  );
}
export const API = {
  /******************/
  /* Authentication */
  /******************/
  auth: {
    register: (email: string, password: string) =>
      postBody("/auth/verify-admin", { email: email, password: password }),
    confirmAdmin: (token: string) =>
      postParam("/auth/confirm-admin", { token: token }),
    login: (email: string, password: string) =>
      postBody("/auth/authenticate-admin", {
        email: email,
        password: password,
      }),
  },
  /********************/
  /* User related api */
  /********************/
  admin: {
    addAdmin: (formData: FormData) => postBody("/add-admin", formData),
    // getAdminById: (id: number) => get("/get-admin-by-id/" + id),
    getAdmin: () => get("/get-admin"),
    // isAllowedToProceed: () => get("/is-allowed-to-proceed"),
  },
  student: {
    add: (formData: FormData) => postBody("/add-student", formData),
    get: (id: number) => get("/get-student-by-id/" + id),
    getAll: () => get("/get-all-student"),
    getAllMinimal: () => get("/get-all-student-minimal"),
    delete: (id: number) => del("/delete-student-by-id/" + id),
    update: (formData: FormData) => put("/update-student", formData),
    getClassTimes: (studentId: number) =>
      get("/get-all-classTime-by-studentId/" + studentId),
  },
  teacher: {
    add: (formData: FormData) => postBody("/add-teacher", formData),
    getById: (id: number) => get("/get-teacher-by-id/" + id),
    getAll: () => get("/get-all-teacher"),
    delete: (id: number) => del("/delete-teacher-by-id/" + id),
    update: (formData: FormData) => put("/update-teacher", formData),
    getClassTimes: (teacherId: number) =>
      get("/get-all-classTime-by-teacherId/" + teacherId),
  },
  contacts: {
    getContactTypes: () => get("/get-all-contactType"),
  },
  religion: {
    getList: () => get("/get-all-religion"),
    add: (religion: Religion) => postBody("/add-religion", religion),
  },
  occupation: {
    getList: () => get("/get-all-occupation"),
  },
  qualification: {
    getExamList: () => get("/get-all-qualification-exam"),
    getBoardList: () => get("/get-all-board"),
    getExamByName: (name: string) => get("/get-exam-by-name/" + name),
    getDepartments: () => get("/get-all-department"),
    institution: {
      getListByBoard: (id: number) =>
        get("/get-all-institution-by-boardId/" + id),
      getUniversityList: () => get(""),
    },
  },
  address: {
    getDivisions: () => get("/get-all-divisions"),
    getDistricts: (divisionId: number) =>
      get("/get-all-district-by-division-id/" + divisionId),
    getUpazilas: (districtId: number) =>
      get("/get-all-upazila-by-district-id/" + districtId),
  },
  /************************/
  /* Coaching related api */
  /************************/
  coaching: {
    addCoaching: (coaching: Coaching) => postBody("/add-coaching", coaching),
    // getCoachingByAdminId: (adminId: number) =>
    //   get("/get-coaching-by-admin-id/" + adminId),
  },
  program: {
    add: (program: Program) => postBody("/add-program", program),
    update: (program: Program) => put("/update-program", program),
    delete: (id: number) => del("/delete-program-by-id/" + id),
    getAll: () => get("/get-all-program"),
    get: (id: number) => get("/get-program-by-id/" + id),
    getEnrolledStudents: (programId: number) =>
      get("/get-all-students-by-programId/" + programId),
    addStudent: (programId: number, studentId: number) =>
      post("/add-enrolledProgram/" + programId + "/" + studentId),
    getClassTimes: (programId: number) =>
      get("/get-all-classTime-by-programId/" + programId),
  },
  subject: {
    add: (subject: Subject) => postBody("/add-subject", subject),
    getAll: () => get("/get-all-subjects"),
    get: (id: number) => get("/get-subject-by-id/" + id),
    delete: (id: number) => del("/delete-subject-by-id/" + id),
    update: (subject: Subject) => put("/update-subject", subject),
  },
  room: {
    add: (room: Room) => postBody("/add-room", room),
    getAll: () => get("/get-all-rooms"),
    get: (id: number) => get("/get-room-by-id/" + id),
    delete: (id: number) => del("/delete-room-by-id/" + id),
    update: (room: Room) => put("/update-room", room),
  },
  batch: {
    add: (batch: Batch) => postBody("/add-batch", batch),
    getAll: (programId: number) =>
      get("/get-all-batch-by-program-id/" + programId),
    get: (id: number) => get("/get-batch-by-id/" + id),
    delete: (id: number) => del("/delete-batch-by-id/" + id),
    update: (batch: Batch) => put("/update-batch", batch),
    addStudent: (batchId: number, studentId: number) =>
      postBody("/add-studentBatch/" + batchId + "/" + studentId, {}),
    deleteStudent: (studentBatchId: number) =>
      del("/delete-studentBatch-by-id/" + studentBatchId),
    getAllStudentBatch: (batchId: number) =>
      get("/get-all-studentBatch-by-batch-id/" + batchId),
    getClassTimes: (batchId: number) =>
      get("/get-all-classTime-by-batchId/" + batchId),
    getStudentBatchesByProgramStudent: (programId: number, studentId: number) =>
      get(
        "/get-all-studentBatch-by-program-id-student-id/" +
          programId +
          "/" +
          studentId
      ),
    importFromAnotherBatch: (batchId: number, anotherBatchId: number) =>
      post("/import-from-another-batch/" + batchId + "/" + anotherBatchId, {}),
  },
  classTime: {
    add: (classTime: ClassTime) => postBody("/add-classTime", classTime),
    // getAllByBatchId: (batchId: number) =>
    //   get("/get-all-classTime-by-batchId/" + batchId),
    // get: (id: number) => get("/get-classTime-by-id/" + id),
    delete: (id: number) => del("/delete-classTime-by-id/" + id),
    update: (classTime: ClassTime) => put("/update-class", classTime),
    saveAll: (classTimes: ClassTime[]) =>
      postBody("/save-all-classTime", classTimes),
  },
  expense: {
    add: (expense: Expense) => postBody("/add-expense", expense),
    getAll: () => get("/get-all-expenses"),
    get: (id: number) => get("/get-expense-by-id/" + id),
    delete: (id: number) => del("/delete-expense-by-id/" + id),
    update: (expense: Expense) => put("/update-expense", expense),
    filterMonthYear: (month: string, year: number) =>
      get("/get-expense-by-coaching-id-month-year/" + month + "/" + year),
  },
  csvImport: {
    students: (formData: FormData) => post("/import-students", formData),
    teachers: (formData: FormData) => post("/import-teachers", formData),
    enrolledProgram: (programId: number, formData: FormData) =>
      post("/import-program-enrollment/" + programId, formData),
    enrolledBatch: (batchId: number, formData: FormData) =>
      post("/import-batch-enrollment/" + batchId, formData),
  },
};
