import axios from "axios";
import { Admin, Religion, Student, Teacher } from "./classes/person-info";
import createQueryParam from "./tools/create-query-param";
import { Coaching, Program, Subject } from "./classes/coaching";

const HOST = "http://localhost:7982";

function post(url, body = {}, param = {}) {
  return axios.post(HOST + url + createQueryParam(param), body);
}
function postParam(url, param) {
  return post(url, {}, param);
}
function postBody(url, body) {
  return post(url, body);
}
function put(url, body) {
  return axios.put(HOST + url, body);
}
function get(url, param = {}) {
  return axios.get(HOST + url + createQueryParam(param));
}
function del(url, param = {}) {
  return axios.delete(HOST + url + createQueryParam(param));
}
export const API = {
  /*****************/
  /* Authorization */
  /*****************/
  auth: {
    register: (email: string, password: string) =>
      postBody("/verify-admin", { email: email, password: password }),
    confirmAdmin: (token: string) =>
      postParam("/confirm-admin", { token: token }),
    login: (email: string, password: string) =>
      postBody("/authenticate-admin", { email: email, password: password }),
  },
  /********************/
  /* User related api */
  /********************/
  admin: {
    addAdmin: (admin: Admin) => postBody("/add-admin", admin),
    getAdminById: (id: number) => get("/get-admin-by-id/" + id),
  },
  student: {
    add: (student: Student) => postBody("/add-student", student),
    get: (id: number) => get("/get-student-by-id/" + id),
    getAll: () => get("/get-all-student"),
    delete: (id: number) => del("/delete-student-by-id/" + id),
    update: (student: Student) => put("/update-student", student),
  },
  teacher: {
    add: (teacher: Teacher) => postBody("/add-teacher", teacher),
    getById: (id: number) => get("/get-teacher-by-id/" + id),
    getAll: () => get("/get-all-teacher"),
    delete: (id: number) => del("/delete-teacher-by-id/" + id),
    update: (student: Student) => put("/update-teacher", student),
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
    getCoachingByAdminId: (adminId: number) =>
      get("/get-coaching-by-admin-id/" + adminId),
  },
  program: {
    add: (program: Program) => postBody("/add-program", program),
    update: (program: Program) => put("/update-program", program),
    delete: (id: number) => del("/delete-program-by-id/" + id),
    getAll: () => get("/get-all-program"),
    get: (id: number) => get("/get-program-by-id/" + id),
  },
  subject: {
    add: (subject: Subject) => postBody("/add-subject", subject),
    getAll: () => get("/get-all-subjects"),
    get: (id: number) => get("/get-subject-by-id/" + id),
    delete: (id: number) => del("/delete-subject-by-id/" + id),
    update: (subject: Subject) => put("/update-subject", subject),
  },
};
