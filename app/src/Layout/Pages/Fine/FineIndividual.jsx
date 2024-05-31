import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FineIndividual = () => {
  const { name, id } = useParams();
  const Frontendapi = window.FrontendAPI;

  const [FetchData, SetFetchData] = useState([]);
  const [fetchFine, SetfetchFine] = useState([]);
  const [userInfo, setuserInfo] = useState([]);
  const [limitStart, SetlimitStart] = useState(0);

  const [limitEnd, SetlimitEnd] = useState(14);

  useEffect(() => {
    async function fetchData() {
      try {
        const userdata = await Frontendapi.MemberInfo();
        const data = await Frontendapi.LogData();
        const fine = await Frontendapi.getFine();
        SetFetchData(data);
        SetfetchFine(fine);
        setuserInfo(userdata);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  let sortData = [];
  let totalCollectedFine = 0;
  let sortAmount;
  const PendingFine = userInfo.find((e) => e.name === name)
    ? userInfo.find((e) => e.name === name).fine
    : 0;
  console.log(PendingFine);
  if (FetchData) {
    FetchData.map((e) => {
      if (e.username == name) {
        if (e.fine !== 0) {
          sortData.push(e);
        }
      }
    });
    fetchFine.map((e) => {
      if (e.name === name) {
        totalCollectedFine += e.sortAmount;
      }
    });
  }
  return (
    <>
      {sortData ? (
        <div className="mx-auto px-4 md:px-6 mt-10">
          <div className="flex mb-8">
            <h1 className="font-bold text-4xl">Fine</h1>
          </div>
          <div className=" border shadow-md rounded-md">
            <div className="">
              <div className="max-w-lg px-5 py-4">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-7">
                  Fine Details
                </h3>
                <p className="text-gray-600 mt-2 font-semibold">
                  Name : {name}
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  Pending Fine Amount : {PendingFine}
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  Total collected fine : {totalCollectedFine}
                </p>
              </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto ">
              <table className="w-full table-auto text-sm text-left bg-white">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">No</th>
                    <th className="py-3 px-6">Fine amount</th>
                    <th className="py-3 px-6">Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {sortData
                    .reverse()
                    .slice(limitStart, limitEnd)
                    .map((item, index) => {
                      // test -= item.loan;

                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                            {index + 1}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.fine}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                            {item.date}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex justify-center mt-4 mb-6">
            <span className="block">
              {" "}
              {limitStart + 1} to {limitEnd + 1}
            </span>
            <div className="space-x-1">
              <button
                title="previous"
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
                onClick={() => {
                  if (limitStart == 0) {
                  } else {
                    SetlimitStart(limitStart - 15);
                    SetlimitEnd(limitEnd - 15);
                  }
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                title="next"
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
                onClick={() => {
                  SetlimitStart(limitStart + 15);
                  SetlimitEnd(limitEnd + 15);
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>loanfing</p>
      )}
    </>
  );
};

export default FineIndividual;
