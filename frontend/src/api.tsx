import axios from "axios";
import { Admin, Religion } from "./classes/person-info";
import createQueryParam from "./tools/create-query-param";
import { Coaching } from "./classes/coaching";

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
function get(url, param = {}) {
  return axios.get(HOST + url + createQueryParam(param));
}
export const API = {
  auth: {
    register: (email: string, password: string) =>
      postBody("/verify-admin", { email: email, password: password }),
    confirmAdmin: (token: string) =>
      postParam("/confirm-admin", { token: token }),
    login: (email: string, password: string) =>
      postBody("/authenticate-admin", { email: email, password: password }),
  },
  admin: {
    addAdmin: (admin: Admin) => postBody("/add-admin", admin),
    getAdminById: (id: number) => get("/get-admin-by-id/" + id),
  },
  address: {
    getDivisions: () => get("/get-all-divisions"),
    getDistricts: (divisionId: number) =>
      get("/get-all-district-by-division-id/" + divisionId),
    getUpazilas: (districtId: number) =>
      get("/get-all-upazila-by-district-id/" + districtId),
  },
  coaching: {
    addCoaching: (coaching: Coaching) => postBody("/add-coaching", coaching),
    getCoachingByAdminId: (adminId: number) =>
      get("/get-coaching-by-admin-id/" + adminId),
  },
  religion: {
    getList: () => get("/get-all-religion"),
    add: (religion: Religion) => postBody("/add-religion", religion),
  },
  occupation: {
    getList: () => get(""),
  },
  board: {
    getList: () => get(""),
  },
  institution: {
    getListByBoard: (id: number) => get(""),
    getUniversityList: () => get(""),
  },
};
