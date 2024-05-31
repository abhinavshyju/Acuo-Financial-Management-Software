import React, { useEffect, useState } from "react";
import bg from "../images/bg.jpg";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Landingpage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTime = Math.floor(5);
    const incrementInterval = (totalTime * 1000) / 100;
    let currentProgress = 0;

    const intervalId = setInterval(() => {
      // Increment progress by 1
      currentProgress++;

      // Update progress
      setProgress((prevProgress) => {
        // Ensure progress does not exceed 100
        return currentProgress > 100 ? 100 : currentProgress;
      });

      if (currentProgress >= 100) {
        clearInterval(intervalId);
      }
    }, incrementInterval);
    return () => clearInterval(intervalId);
  }, []); //

  return (
    <div
      className="w-full h-screen absolute top-0 left-0 flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="flex flex-col w-2/4 h-3/5 bg-black bg-cover shadow-lg rounded-md min-w-[700px] items-center px-7 py-4 justify-between"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex flex-col items-center">
          <img src={logo} alt="" className="w-1/3" />
          <h1 className="font-black text-4xl text-white">HARISREE</h1>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-end gap-2">
            {progress === 100 ? (
              <h1 className="text-white text-lg font-bold">Done.</h1>
            ) : (
              <>
                <h1 className="text-white text-lg font-bold">Loading</h1>
                <span className="loading loading-dots loading-md text-white"></span>
              </>
            )}
          </div>
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max="100"
          ></progress>
          <div className="flex justify-end  ">
            {progress === 100 ? (
              <Link
                to={"/home"}
                className="text-xl font-bold bg-white px-4 py-1 rounded-xl"
              >
                Get start
              </Link>
            ) : (
              <>
                <Link className="text-xl font-bold bg-transparent px-4 py-1 rounded-xl text-transparent">
                  afsd
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
