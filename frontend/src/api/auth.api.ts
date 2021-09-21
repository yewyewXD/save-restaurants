import axios from "axios";

interface authPayload {
  username: string;
  email: string;
  password: string;
  reCaptchaToken: string;
}

interface googleLoginPayload {
  tokenId: string;
  reCaptchaToken: string;
}

export function registerUser(data: authPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/register`,
    data,
  });
}

export function loginUser(data: authPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/login`,
    withCredentials: true,
    data,
  });
}

export function googleLoginUser(data: googleLoginPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/google-login`,
    withCredentials: true,
    data,
  });
}

export function logoutUser() {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/logout`,
    withCredentials: true,
  });
}

export async function verifyUser(code: string) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/verify`,
    data: {
      code,
    },
  });
}
