import React from "react";
import { ImSpinner } from "react-icons/im";

export default function Loading() {
  return (
    <>
      <div className=" flex justify-center items-center h-screen text-9xl ">
        <ImSpinner className="animate-spin" />
      </div>
    </>
  );
}
