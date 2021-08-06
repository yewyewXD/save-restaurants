import axios from "axios";

export function registerUser(data) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/register`,
    data,
  });
}
