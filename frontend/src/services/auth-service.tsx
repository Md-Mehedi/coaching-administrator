import axios from "axios";
import { API } from "../api";
import { Coaching } from "../classes/coaching";
import { Admin } from "../classes/person-info";

let AuthService = {
  login(token: string, admin: Admin) {
    localStorage.clear();
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(admin));
  },
  // register(email: string, password: string) {
  //   return axios.post(API.auth.register, { email: email, password: password });
  // }
  // prefix = "/api/auth";
  // existByEmail(email: string) {
  //   return axios.post(GLOBAL.HOST + this.prefix + `/validity-email/${email}`);
  // }
  // existByUsername(username: string) {
  //   return axios.post(
  //     GLOBAL.HOST + this.prefix + `/validity-username/${username}`
  //   );
  // }
  // registerStudent(student: Person, eduStatusId: Number) {
  //   return axios.post(
  //     GLOBAL.HOST + this.prefix + `/register-student/${eduStatusId}`,
  //     student
  //   );
  // }
  // registerTeacher(teacher: Person, designationId: Number) {
  //   return axios.post(
  //     GLOBAL.HOST + this.prefix + `/register-teacher/${designationId}`,
  //     teacher,
  //     authHeaders()
  //   );
  // }
  // signIn(username: string, password: string) {
  //   return axios.post(GLOBAL.HOST + this.prefix + `/signin`, {
  //     username,
  //     password,
  //   });
  // }
  // requestChangePassword(username: string, dob: Date) {
  //   return axios.post(
  //     GLOBAL.HOST + this.prefix + `/request-password-change/${username}`,
  //     dob
  //   );
  // }
  // changePassword(username: string, password: string) {
  //   return axios.post(GLOBAL.HOST + this.prefix + `/password-change`, {
  //     username,
  //     password,
  //   });
  // }
  // isLogin() {
  //   if (localStorage.getItem("user")) {
  //     return true;
  //   }
  //   return false;
  // }
  // logout() {
  //   localStorage.removeItem("user");
  // }
  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem("user") + "");
  // }
  // getToken() {
  //   if (this.getCurrentUser()) {
  //     return this.getCurrentUser().token;
  //   } else return "";
  // }
  // getCurrentUsername() {
  //   if (this.getCurrentUser()) {
  //     return this.getCurrentUser().username;
  //   } else return "";
  // }
  // getCurrentEmail() {
  //   if (this.getCurrentUser()) {
  //     return this.getCurrentUser().email;
  //   } else return "";
  // }
  // getCurrentAccountType() {
  //   if (this.getCurrentUser()) {
  //     return this.getCurrentUser().accountType;
  //   } else return "";
  // }
  // getPhoto() {
  //   if (this.getCurrentUser()) {
  //     return this.getCurrentUser().photo;
  //   } else return undefined;
  // }
  setAdmin(admin: Admin) {
    localStorage.setItem("admin", JSON.stringify(admin));
  },
  getAdmin(): Admin | undefined {
    return localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin") || "")
      : undefined;
  },
  getCoaching(): Coaching | undefined {
    return this.getAdmin()?.person?.coaching;
  },
  getId() {
    return this.getAdmin()?.person?.id;
  },
  getCoachingId() {
    return this.getCoaching()?.id;
  },
  getToken() {
    return localStorage.getItem("token");
  },
  getHeaders() {
    const token = this.getToken();

    if (token) {
      return {
        headers: {
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      };
    } else {
      return {
        headers: {
          Authorization: "",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      };
    }
  },
};
export default AuthService;
