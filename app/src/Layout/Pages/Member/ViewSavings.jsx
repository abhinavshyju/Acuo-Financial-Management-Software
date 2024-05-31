import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSavings = () => {
  const { name, id } = useParams();
  const Frontendapi = window.FrontendAPI;

  const [FetchData, SetFetchData] = useState();
  const [fetchLoan, SetFetchLoan] = useState();
  const [limitStart, SetlimitStart] = useState(0);
  const [limitEnd, SetlimitEnd] = useState(14);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await Frontendapi.LogData();
        const loan = await Frontendapi.LoanInfo();
        SetFetchData(data);
        SetFetchLoan(loan);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  let sortData = [];
  let sortAmount;
  let SortDate;
  if (FetchData) {
    FetchData.map((e) => {
      if (e.username == name) {
        sortData.push(e);
      }
    });
  }
  if (fetchLoan) {
    fetchLoan.map((e) => {
      if (e.id == id) {
        SortDate = e.date;
        sortAmount = e.interest;
      }
    });
  }
  const totalAmount = sortData.reduce((total, e) => total + e.savings, 0);
  let test = totalAmount;
  return (
    <>
      {sortData ? (
        <div className="mx-auto px-4 md:px-6 mt-10">
          <div className="flex mb-8">
            <h1 className="font-bold text-4xl">Savings</h1>
          </div>
          <div className=" border shadow-md rounded-md">
            <div className="">
              <div className="max-w-lg px-5 py-4">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-7">
                  Savings Details
                </h3>
                <p className="text-gray-600 mt-2 font-semibold">
                  Name : {name}
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  Total Savings :{" "}
                  {sortData.reduce((total, e) => total + e.savings, 0)}
                </p>
                {/* <p className="text-gray-600 mt-2 font-semibold">
                  Date : {SortDate}
                </p> */}
              </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto ">
              <table className="w-full table-auto text-sm text-left bg-white">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Initial amount</th>

                    <th className="py-3 px-6">collected amount</th>
                    <th className="py-3 px-6">Total amount</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {sortData.reverse().map((item, index) => {
                    test -= item.savings;
                    if (limitStart <= index && limitEnd >= index) {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                            {item.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {test}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.savings}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {test + item.savings}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap">{test}</td> */}
                        </tr>
                      );
                    }
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

export default ViewSavings;
