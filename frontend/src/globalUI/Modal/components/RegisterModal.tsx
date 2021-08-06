import React, { FC, ChangeEvent, useState } from "react";

const RegisterModal: FC = () => {
  const [registerInfo, setRegisterInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  function handleLogin() {
    console.log("register clicked");
    console.log(registerInfo);
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
        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
      </div>

      <div className="flex items-center">
        <button
          onClick={handleLogin}
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
