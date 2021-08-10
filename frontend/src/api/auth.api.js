import axios from "axios";

export function registerUser(data) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/register`,
    withCredentials: true,
    data,
  });
}

export function loginUser(data) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/login`,
    withCredentials: true,
    data,
  });
}

export function googleLoginUser(data) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/google-login`,
    withCredentials: true,
    data,
  });
}
