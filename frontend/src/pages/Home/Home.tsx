import React, { FC, ChangeEvent, useState } from "react";
import HeroSection from "./components/HeroSection";

const Home: FC = () => {
  const [registerInfo, setRegisterInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  function handleLogin() {
    console.log("going to login");
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
    <div>
      <HeroSection />
      <div>
        <label htmlFor="displayName">Enter Username</label>
        <input
          value={registerInfo.displayName}
          type="text"
          id="displayName"
          onChange={handleUpdateForm}
        />
      </div>

      <div>
        <label htmlFor="email">Enter Email</label>
        <input
          value={registerInfo.email}
          onChange={handleUpdateForm}
          type="email"
          id="email"
        />
      </div>

      <div>
        <label htmlFor="password">Enter Password</label>
        <input
          value={registerInfo.password}
          onChange={handleUpdateForm}
          type="password"
          id="password"
        />
      </div>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Home;
