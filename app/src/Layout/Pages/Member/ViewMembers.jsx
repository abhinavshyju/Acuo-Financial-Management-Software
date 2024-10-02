import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MemberSubNAv from "../../Components/NanoComponents/MemberSubNAv";

const ViewMembers = () => {
  const apiCall = window.BackendAPI;
  const Data = window.FrontendAPI;
  const DataTo = window.BackendAPI;

  const [Info, setInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await Data.MemberInfo();
        setInfo(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  function Delete(id, name) {
    const data = {
      id: id,
      name: name,
    };
    DataTo.send("removemember", data);
    console.log(data);
  }

  return (
    <div className="mx-auto px-4 md:px-6 mt-10 pb-9">
      <div className="flex mb-8">
        <h1 className="font-bold text-4xl">Member</h1>
      </div>
      <MemberSubNAv id="0" />
      <div className="items-start justify-between mt-5 md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Team members
          </h3>
          <p className="text-gray-600 mt-2">
            Collaborate Effectively with Your Team – Team Members Management
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => apiCall.send("print-to-pdf-3", JSON.stringify(Info))}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-green-600 rounded-sm hover:bg-green-500 active:bg-green-700 md:text-sm mr-3"
          >
            Print
          </button>
          <Link
            to="/members/add"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-sm hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add member
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto ">
        <table className="w-full table-auto text-sm text-left bg-white">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">NO</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Total Savings</th>
              <th className="py-3 px-6">Pending Savings</th>
              <th className="py-3 px-6">Pending Magalam</th>
              <th className="py-3 px-6">Fine</th>
              <th className="py-3 px-6">Interest</th>
              <th className="py-3 px-6">Loan Amount</th>
              <th className="py-3 px-6">Additional Loan</th>
              <th className="py-3 px-6"></th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {Info.map((e, index) => (
              <tr key={e.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                  {e.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {e.totalsavings}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {e.pendingsavings}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {e.pendingmagalam}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{e.fine}</td>
                <td className="px-6 py-4 whitespace-nowrap">{e.interest}</td>
                <td className="px-6 py-4 whitespace-nowrap">{e.loan || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {e.Additionalloan || 0}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    className="py-2 px-3 font-medium text-blue-400 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-sm"
                    onClick={() =>
                      apiCall.send(
                        "print-to-pdf-2",
                        JSON.stringify({ name: e.name })
                      )
                    }
                  >
                    Print
                  </button>
                  <Link
                    to={`/members/savings/${e.name}/${e.id}`}
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
    </div>
  );
};

export default ViewMembers;
