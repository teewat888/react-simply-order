import { BASE_URL } from "../config/contants";
import { authActions } from "../store/auth-slice";
import { confObjAuth, confObjAuthwithBody, respFunc } from "./helper";

// to provide admin function eg user management
class AdminService {
  fetchUsers() {
    return fetch(BASE_URL + "/users", confObjAuth("GET")).then(respFunc);
  }
}

export default new AdminService();
