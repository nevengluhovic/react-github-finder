import React from "react";
import spinner from "../assets/spinner.gif";

const Spinner = () => {
  return (
    <div className="w-100 mt-20">
      <img className="text-center  mx-auto" src={spinner} alt="" width={180} />
    </div>
  );
};

export default Spinner;