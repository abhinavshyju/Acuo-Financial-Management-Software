import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LoanInduvidual = () => {
  const { name, id } = useParams();
  const Frontendapi = window.FrontendAPI;

  const [FetchData, SetFetchData] = useState();
  const [fetchLoan, SetFetchLoan] = useState();

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
  const SortDateList = sortData.filter(
    (date) => new Date(date.date) >= new Date(SortDate)
  );
  console.log(sortAmount);
  console.log(SortDateList);
  let test = sortAmount;
  return (
    <>
      {sortData ? (
        <div className="mx-auto px-4 md:px-6 mt-10">
          <div className="flex mb-8">
            <h1 className="font-bold text-4xl">Loan</h1>
          </div>
          <div className=" border shadow-md rounded-md">
            <div className="">
              <div className="max-w-lg px-5 py-4">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-7">
                  Loan Details
                </h3>
                <p className="text-gray-600 mt-2 font-semibold">
                  Name : {name}
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  Loan Amount : {sortAmount}
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  Date : {SortDate}
                </p>
              </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto ">
              <table className="w-full table-auto text-sm text-left bg-white">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Initial amount</th>
                    <th className="py-3 px-6">Total amount</th>
                    <th className="py-3 px-6">collected amount</th>
                    <th className="py-3 px-6">Pending amount</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {SortDateList.map((item, index) => {
                    test -= item.loan;

                    if (test >= 0) {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                            {item.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {test + item.loan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {test + item.loan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.loan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {test}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>loanfing</p>
      )}
    </>
  );
};

export default LoanInduvidual;
