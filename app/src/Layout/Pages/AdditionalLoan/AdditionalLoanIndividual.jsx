import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdditionalLoanInduvidual = () => {
  const { name, id } = useParams();
  const Frontendapi = window.FrontendAPI;

  const [FetchData, SetFetchData] = useState();
  const [fetchLoan, SetFetchLoan] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await Frontendapi.getadditionalloanlog();
        const loan = await Frontendapi.getAdditionalloan();
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
      if (e.name == name) {
        sortData.push(e);
      }
    });
  }
  if (fetchLoan) {
    fetchLoan.map((e) => {
      if (e.name == name) {
        SortDate = e.date;
        sortAmount = e.amount;
      }
    });
  }
  const SortDateList = sortData.filter(
    (date) => new Date(date.date) >= new Date(SortDate)
  );
  const totalCollected = SortDateList.reduce((total, e) => total + e.amount, 0);
  let test = sortAmount - totalCollected;

  return (
    <>
      {sortData ? (
        <div className="mx-auto px-4 md:px-6 mt-10">
          <div className="flex mb-8">
            <h1 className="font-bold text-4xl">Additional Loan</h1>
          </div>
          <div className=" border shadow-md rounded-md">
            <div className="">
              <div className="max-w-lg px-5 py-4">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-7">
                  Additional Loan Details
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
                  {SortDateList.reverse().map((item, index) => {
                    test += item.amount;
                    if (test - item.amount < 0) return null;
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{test}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{test}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {test - item.amount}
                        </td>
                      </tr>
                    );
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

export default AdditionalLoanInduvidual;
