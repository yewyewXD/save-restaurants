import axios from "axios";

interface IAuthPayload {
  username: string;
  email: string;
  password: string;
  reCaptchaToken: string;
}

interface IGoogleLoginPayload {
  tokenId: string;
  reCaptchaToken: string;
}

interface IVerifyUserPayload {
  code: string;
  userId: string;
}

interface ISendPasswordResetLinkPayload {
  email: string;
  reCaptchaToken: string;
}

interface IResetPasswordPayload {
  code: string;
  userId: string;
  reCaptchaToken: string;
  password: string;
}

export function registerUser(data: IAuthPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/register`,
    data,
  });
}

export function loginUser(data: IAuthPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/login`,
    withCredentials: true,
    data,
  });
}

export function googleLoginUser(data: IGoogleLoginPayload) {
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

export async function verifyUser(data: IVerifyUserPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/verify`,
    data,
  });
}

export async function sendPasswordResetLink(
  data: ISendPasswordResetLinkPayload
) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/get-reset`,
    data,
  });
}

export async function resetPassword(data: IResetPasswordPayload) {
  return axios({
    method: "post",
    url: `http://localhost:5000/api/auth/reset`,
    data,
  });
}
