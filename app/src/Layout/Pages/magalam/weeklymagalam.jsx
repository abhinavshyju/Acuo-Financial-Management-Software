import React, { useEffect, useState } from "react";

const Weeklymagalam = () => {
  const [fetchdata, SetFetchData] = useState();
  const apiCall = window.FrontendAPI;
  useEffect(() => {
    const test = async () => {
      const data = await apiCall.accountsInfo();
      SetFetchData(data.reverse());
    };
    test();
  }, []);
  const [limitStart, SetlimitStart] = useState(0);
  const [limitEnd, SetlimitEnd] = useState(14);
  var total_magalam = 0;
  if (fetchdata) {
    total_magalam = fetchdata
      .slice(0, fetchdata.length - limitStart + 1)
      .reduce((total, e) => total + e.magalam, 0);
  }
  var test = total_magalam;

  return (
    <div>
      <div className="mx-auto px-4 md:px-6 mt-10">
        <div className="flex mb-8">
          <h1 className="font-bold text-4xl">Magalam record</h1>
        </div>
        <div className="items-start justify-between mt-5 md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage magalam
            </h3>
            <p className="text-gray-600 mt-2">
              Keep track of all your magalam in one centralized hub.
            </p>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto ">
          <table className="w-full table-auto text-sm text-left bg-white">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">NO</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Total</th>
              </tr>
            </thead>
            {fetchdata ? (
              <tbody className="text-gray-600 divide-y">
                {fetchdata.slice(limitStart, limitEnd + 1).map((e, index) => {
                  test -= e.magalam;
                  return (
                    <tr key={e.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1 + limitStart}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">{e.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                        {e.magalam}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                        {test + e.magalam}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <p>Loading...</p>
            )}
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
    </div>
  );
};

export default Weeklymagalam;
