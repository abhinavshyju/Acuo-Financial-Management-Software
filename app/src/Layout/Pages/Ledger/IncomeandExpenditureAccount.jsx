import React, { useEffect, useState } from "react";
import MemberSubNAv from "../../Components/NanoComponents/MemberSubNAv";

const IncomeandExpenditureAccount = () => {
  const frontendapi = window.FrontendAPI;

  const [Memberdata, SetMemberdata] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await frontendapi.MemberInfo();
      SetMemberdata(data);
    }
    fetchData();
  }, []);
  if (Memberdata) {
    // console.log(Memberdata)
  }
  // <div className="h-5 col-span-2 even:bg-amber-100 odd:bg-blue-100"></div>
  return (
    <div className="mx-auto  mt-10">
      <div className="flex mb-4">
        <h1 className="font-bold text-2xl">Expenses & Income</h1>
      </div>
      {Memberdata ? (
        <div className="">
          <div className="mt-2 shadow-sm border rounded-sm overflow-x-auto ">
            <table className="w-full table-auto text-sm text-left bg-white">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">NO</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Total Savings</th>
                  <th className="py-3 px-6">Loan Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {Memberdata.map((e, index) => (
                  <tr key={e.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                      {e.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {e.totalsavings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {e.loan || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6"></th>
                  <th className="py-3 px-6">Total</th>
                  <th className="py-3 px-6">
                    {Memberdata.reduce(
                      (total, e) => total + Number(e.totalsavings),
                      0
                    )}
                  </th>
                  <th className="py-3 px-6">
                    {Memberdata.reduce((total, e) => total + Number(e.loan), 0)}
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default IncomeandExpenditureAccount;
