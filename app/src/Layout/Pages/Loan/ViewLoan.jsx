import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoanSubNav from "../../Components/NanoComponents/LoanSubNav";
import Select from "react-select";

const ViewLoan = () => {
  const DataFrom = window.FrontendAPI;
  const [name, Setname] = useState();
  const [memberdata, Setmemberdata] = useState();
  const [info, setInfo] = useState([]);
  const [limitStart, SetlimitStart] = useState(0);
  const [limitEnd, SetlimitEnd] = useState(14);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await DataFrom.LoanInfo();
        const info = await DataFrom.MemberInfo();
        setInfo(data);
        Setmemberdata(info);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const data = [];
  if (name) {
    info.map((e) => {
      if (name == e.name) {
        data.push(e);
      }
    });
  } else {
    data.push(...info);
  }
  console.log(data);
  return (
    <>
      {data && memberdata ? (
        <div className="mx-auto px-4 md:px-6 mt-10">
          <div className="flex mb-8">
            <h1 className="font-bold text-4xl">Loan</h1>
          </div>
          <LoanSubNav id="0" />
          <div className="items-start justify-between mt-5 md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Manage Loans
              </h3>
              <p className="text-gray-600 mt-2">
                Keep track of all your loans in one centralized hub.
              </p>
            </div>
            <div className="mt-3 md:mt-0 w-56   ">
              <label for="firstname" className="text-sm">
                Member name
              </label>
              <Select
                className="w-full mb-5"
                options={memberdata.map((e) => ({
                  label: e.name,
                  value: e.name,
                }))}
                onChange={(e) => Setname(e.value)}
              />
            </div>
          </div>
          <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto ">
            <table className="w-full table-auto text-sm text-left bg-white">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">NO</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Principal Amount</th>
                  <th className="py-3 px-6">Total Value</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {data
                  .reverse()
                  .slice(limitStart, limitEnd + 1)
                  .map((e, index) => (
                    <tr key={e.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                        {e.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{e.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {e.loanamount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {e.interest || 0}
                      </td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <Link
                          to={`/loan/${e.name}/${e.id}`}
                          className="py-2 px-3 font-medium text-green-400 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
        <p>loanding</p>
      )}
    </>
  );
};

export default ViewLoan;
