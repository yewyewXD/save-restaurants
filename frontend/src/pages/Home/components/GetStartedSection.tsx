import React from "react";
import { useModal } from "../../../context/modal/ModalState";
import AuthModal from "../../../globalUI/Modal/components/AuthModal";

const GetStartedSection = () => {
  const { handleShowModal } = useModal();

  return (
    <section className="text-center w-full py-16 bg-yellow-400">
      <h1 className="leading-none text-6xl font-bold mb-8">
        Ready to get started?
      </h1>
      <div className="flex justify-center items-center">
        <button
          className="bg-blue-600 px-11 py-3 rounded text-white hover:bg-black  transition duration-200 font-bold mr-4 border-2 border-blue-600 hover:border-black"
          onClick={() => {
            handleShowModal(<AuthModal isLogin={false} />);
          }}
        >
          Sign Up
        </button>

        <button
          className=" text-black px-11 py-3 rounded  hover:bg-black transition duration-200 font-bold mr-4  hover:text-white border-2 border-black"
          onClick={() => {
            handleShowModal(<AuthModal isLogin={true} />);
          }}
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default GetStartedSection;
