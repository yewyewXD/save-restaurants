import React, { FC, ChangeEvent, useState } from "react";
import { registerUser } from "../api/user.api";

const RegisterModal: FC = () => {
  const [errMsg, setErrMsg] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  async function handleRegisterUser() {
    if (!handleValidateForm()) {
      return;
    }

    try {
      console.log(registerInfo);
      const res = await registerUser(registerInfo);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  function handleUpdateForm(e: ChangeEvent<HTMLInputElement>) {
    e.persist();
    setRegisterInfo((prevInfo) => {
      return {
        ...prevInfo,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleValidateForm() {
    if (
      !registerInfo.displayName ||
      !registerInfo.email ||
      !registerInfo.password
    ) {
      setErrMsg("Please complete all fields");
      return false;
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(registerInfo.email).toLowerCase())) {
      setErrMsg("Please enter a valid email");
      return false;
    }

    if (registerInfo.password.length < 5) {
      setErrMsg("Password needs to have at least 5 characters");
      return false;
    }

    if (errMsg) {
      setErrMsg("");
    }

    return true;
  }

  return (
    <div className="p-3">
      {/* username */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="displayName"
        >
          Username
        </label>
        <input
          value={registerInfo.displayName}
          onChange={handleUpdateForm}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="displayName"
          type="text"
          placeholder="Username"
        />
      </div>

      {/* email */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          value={registerInfo.email}
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
          value={registerInfo.password}
          onChange={handleUpdateForm}
          // border-red-500
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="***********"
        />

        {(errMsg ? true : false) && (
          <p className="text-red-500 text-xs italic">{errMsg}</p>
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={handleRegisterUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
