import React, { FC, ChangeEvent, useState } from "react";
import { registerUser } from "../api/auth.api";
const { GoogleLogin } = require("react-google-login");

interface Props {
  isLogin: boolean;
}

const AuthModal: FC<Props> = ({ isLogin }) => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  async function handleLoginUser() {
    console.log(authInfo);
  }

  async function handleRegisterUser() {
    if (!handleValidateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log(authInfo);
      const res = await registerUser(authInfo);
      console.log(res.data);
      setIsSubmitting(false);
    } catch (err) {
      console.log(err.response.data);
      setErrMsg(err.response.data.message);
      setIsSubmitting(false);
    }
  }

  function handleUpdateForm(e: ChangeEvent<HTMLInputElement>) {
    e.persist();
    setAuthInfo((prevInfo) => {
      return {
        ...prevInfo,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleValidateForm() {
    if (!authInfo.displayName || !authInfo.email || !authInfo.password) {
      setErrMsg("Please complete all fields");
      return false;
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(authInfo.email).toLowerCase())) {
      setErrMsg("Please enter a valid email");
      return false;
    }

    if (authInfo.password.length < 5) {
      setErrMsg("Password needs to have at least 5 characters");
      return false;
    }

    if (errMsg) {
      setErrMsg("");
    }

    return true;
  }

  function googleLogin(response: object) {
    console.log({ response });
  }

  return (
    <div className="p-3" data-testid="register-modal">
      {/* username */}
      {!isLogin && (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="displayName"
          >
            Username
          </label>
          <input
            value={authInfo.displayName}
            onChange={handleUpdateForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="displayName"
            type="text"
            placeholder="Username"
          />
        </div>
      )}

      {/* email */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          value={authInfo.email}
          onChange={handleUpdateForm}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="info@example.com"
        />
      </div>

      {/* password */}
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          value={authInfo.password}
          onChange={handleUpdateForm}
          // border-red-500
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="***********"
        />

        {(errMsg ? true : false) && (
          <p
            data-testid="register-err-msg"
            className="text-red-500 text-xs italic"
          >
            {errMsg}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <button
          data-testid="submit-user-register"
          disabled={isSubmitting}
          onClick={isLogin ? handleLoginUser : handleRegisterUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>

      <div className="mt-6">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={googleLogin}
          onFailure={googleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default AuthModal;
