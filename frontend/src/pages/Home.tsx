import React, { FC, useState } from "react";
import Layout from "../components/Layout";

interface RegisterInfo {
  displayName: string;
  email: string;
  password: string;
}

const Home: FC = () => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    displayName: "",
    email: "",
    password: "",
  });

  function handleLogin() {
    console.log("going to login");
  }

  //   function handleUpdateForm(e){
  // if(e.persist)e.persist()
  //   }

  return (
    <Layout metaTitle={"MY TITLE"}>
      <div>
        <div>
          <label htmlFor="displayName">Enter Username</label>
          <input
            value={registerInfo.displayName}
            type="text"
            id="displayName"
          />
        </div>

        <div>
          <label htmlFor="email">Enter Email</label>
          <input value={registerInfo.email} type="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Enter Password</label>
          <input value={registerInfo.password} type="password" id="password" />
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </Layout>
  );
};

export default Home;
