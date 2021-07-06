import React, { FC } from "react";
import Layout from "../components/Layout";

const Home: FC = () => {
  function handleLogin() {
    console.log("going to login");
  }

  return (
    <Layout metaTitle={"MY TITLE"}>
      <div>
        <div>
          <label htmlFor="loginEmail">Enter Email</label>
          <input type="email" id="loginEmail" />
        </div>

        <div>
          <label htmlFor="loginPassword">Enter Password</label>
          <input type="password" id="loginPassword" />
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </Layout>
  );
};

export default Home;
