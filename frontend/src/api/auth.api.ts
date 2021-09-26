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

interface verifyUserPayload {
  code: string;
  userId: string;
}

interface sendPasswordResetLinkPayload {
  email: string;
  reCaptchaToken: string;
}

interface resetPasswordPayload {
  code: string;
  userId: string;
  reCaptchaToken: string;
  password: string;
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

export async function verifyUser(data: verifyUserPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/verify`,
    data,
  });
}

export async function sendPasswordResetLink(
  data: sendPasswordResetLinkPayload
) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/get-reset`,
    data,
  });
}

export async function resetPassword(data: resetPasswordPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/reset`,
    data,
  });
}
