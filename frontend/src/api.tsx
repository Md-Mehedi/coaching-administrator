import axios from "axios";
import createQueryParam from "./tools/create-query-param";

const HOST = "http://localhost:7982";

function post(url, param = {}, body = {}) {
  return axios.post(HOST + url + createQueryParam(param), body);
}
function postParam(url, param) {
  return post(url, param);
}
function postBody(url, body) {
  return post(url, {}, body);
}

export const API = {
  auth: {
    register: (email: string, password: string) =>
      postBody("/verify-admin", { email: email, password: password }),
    confirmAdmin: (token: string) =>
      postParam("/confirm-admin", { token: token }),
  },
};
