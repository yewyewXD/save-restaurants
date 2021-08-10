import axios from "axios";

export function getUserMe() {
  return axios({
    method: "get",
    url: `http://localhost:5000/api/user`,
  });
}
