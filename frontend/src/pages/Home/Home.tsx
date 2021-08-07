import React, { FC } from "react";
import { useAuth } from "../../context/auth/AuthState";
import HeroSection from "./components/HeroSection";

const Home: FC = () => {
  const { authName, clearUserAuth } = useAuth();
  return (
    <main>
      <nav className="h-12 ">
        <div className="my-2 h-full w-full flex justify-between mx-5">
          <div>
            {authName ? `Welcome back, ${authName}!` : "You are not logged in"}
          </div>

          {authName && (
            <button
              onClick={clearUserAuth}
              data-testid="register-btn"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <HeroSection />
    </main>
  );
};

export default Home;
