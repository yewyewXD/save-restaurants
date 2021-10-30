import React, { useCallback, useState, SyntheticEvent } from "react";
import Dropzone from "react-dropzone";
import { useModal } from "../context/modal/ModalState";

const ImageUploader = () => {
  const [previewImage, setPreviewImage] = useState("");
  const { handleHideModal } = useModal();

  const onDrop = useCallback((acceptedFiles) => {
    setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  return (
    <Dropzone onDrop={onDrop} multiple={false} maxFiles={1} accept="image/*">
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div
            {...getRootProps()}
            className="flex justify-center items-center flex-col w-30 text-center font-bold bg-primary-xlight rounded border-dashed border-4 border-yellow-400 cursor-pointer  hover:bg-yellow-200 transition duration-200 px-12 py-8"
          >
            <input {...getInputProps()} />

            {previewImage ? (
              <img src={previewImage} className="max-h-60 mb-4" alt="" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#000000"
              >
                {isDragActive ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                )}
              </svg>
            )}

            <p>Drag your photos here to start uploading</p>

            <div className="flex justify-center items-center mt-2">
              <hr className="border-t-2 border-gray-500 w-12" />
              <span className="text-gray-500 mx-2">OR</span>
              <hr className="border-t-2 border-gray-500 w-12" />
            </div>

            <div className="mt-3 flex justify-center items-center">
              <button className="bg-black px-6 font-bold py-2 rounded  hover:bg-blue-600 transition duration-200 text-white border-2 border-black hover:border-blue-600">
                Browse file
              </button>

              {previewImage && (
                <button
                  className="z-10 ml-4 bg-transparent px-6 font-bold py-2 rounded hover:text-white hover:bg-transparent transition duration-200 border-2 border-black hover:bg-red-600 hover:border-red-600"
                  onClick={(e: SyntheticEvent): void => {
                    e.stopPropagation();
                    setPreviewImage("");
                    handleHideModal();
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};

export default ImageUploader;
