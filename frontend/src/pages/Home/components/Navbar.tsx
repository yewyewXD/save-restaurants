import React, { useState, useMemo } from "react";
import { useAuth } from "../../../context/auth/AuthState";
import { useModal } from "../../../context/modal/ModalState";
import AuthModal from "../../../globalUI/Modal/components/AuthModal";
const { useHistory, Link } = require("react-router-dom");

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const { handleShowModal } = useModal();
  const history = useHistory();

  const [showNavbar, setShowNavbar] = useState(false);

  function toggleShowNavbar(): void {
    setShowNavbar((prevShow) => !prevShow);
  }

  function redirectToDashboard(): void {
    history.push("/dashboard");
  }

  function openAuthModal(): void {
    handleShowModal(<AuthModal isLogin={true} />);
  }

  const navLinks = useMemo(() => {
    return [
      { id: 1, name: "Home", link: "/" },
      { id: 2, name: "About", link: "/about" },
      { id: 3, name: "Blogs", link: "/blogs" },
      { id: 5, name: "Contact", link: "/contact" },
    ];
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 mr-10">
        <span className="font-bold text-4xl tracking-tight leading-none">
          <span className="text-primary">e</span>atery
        </span>
      </div>
      {/* <div className="block md:hidden"> */}
      <div className="hidden">
        <button
          onClick={toggleShowNavbar}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400  hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className="ml-auto flex justify-center items-center md:hidden">
        <button
          onClick={isLoggedIn ? redirectToDashboard : openAuthModal}
          className="transition duration-200 block text-sm px-7 font-bold py-2 leading-none rounded bg-primary hover:text-white hover:bg-black"
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </button>
      </div>

      <div
        className={`${
          showNavbar ? "block" : "hidden"
        } w-full flex-grow md:flex md:items-center md:w-auto`}
      >
        <div className="text-sm md:flex-grow hidden">
          {navLinks.map((navLink) => (
            <Link
              key={navLink.id}
              to={navLink.link}
              className="block mt-4 md:inline-block md:mt-0 text-teal-200  mr-4"
            >
              {navLink.name}
            </Link>
          ))}
        </div>
        <div className="ml-auto">
          <button
            onClick={isLoggedIn ? redirectToDashboard : openAuthModal}
            className="transition duration-200 inline-block text-sm px-7 font-bold py-2 leading-none rounded mt-4 md:mt-0 bg-primary hover:text-white hover:bg-black"
          >
            {isLoggedIn ? "Dashboard" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
