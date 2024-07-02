import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RegisterSubNav from "../../Components/NanoComponents/RegisterSubNav";
const RegiterView = () => {
  const Data = window.FrontendAPI;
  const DataFrom = window.FrontendAPI;

  const [userData, setUserData] = useState([]);

  const [Info, setInfo] = useState([]);
  const Date = moment().format("L");
  const toDay =
    Date.slice(6, 10) + "-" + Date.slice(0, 2) + "-" + Date.slice(3, 5);
  const [sortDate, SetsortDate] = useState(toDay);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await Data.LogData();
        setUserData(data);
        const Memberdata = await DataFrom.MemberInfo();
        setInfo(Memberdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const [name, Setname] = useState();

  const CheckDate =
    sortDate.slice(5, 7) +
    "/" +
    sortDate.slice(8, 10) +
    "/" +
    sortDate.slice(0, 4);

  const sortData = [];
  userData.map((e) => {
    if (CheckDate == e.date) {
      sortData.push(e);
    }
  });

  const nameSearch = [];
  sortData.map((e) => {
    if (name == null) {
      nameSearch.push(e);
    } else {
      if (name == e.username) {
        nameSearch.push(e);
      }
    }
  });
  console.log(nameSearch);
  const AddFunc = (save, loa, maga, fin, inter) => {
    const saving = parseInt(save) || 0;
    const loan = parseInt(loa) || 0;
    const magalam = parseInt(maga) || 0;
    const fine = parseInt(fin) || 0;
    const interest = parseInt(inter) || 0;

    const Sum = saving + loan + magalam + fine + interest;
    return Sum;
  };
  return (
    <div className="mx-auto px-4 md:px-6 mt-10 pb-10">
      <div className="flex mb-8">
        <h1 className="font-bold text-4xl">Accounts</h1>
      </div>
      <RegisterSubNav id="1" />
      <div className="items-start justify-between mt-8 md:flex ">
        <div className="max-w-lg ">
          <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl">
            Weekly Fundraising view
          </h3>
          <p className="text-neutral-600 mt-3">
            Weekly fundraising Activities view section
          </p>
        </div>
        <input
          type="date"
          className="input input-bordered input-info date-in"
          placeholder={toDay}
          value={sortDate}
          onChange={(e) => SetsortDate(e.target.value)}
        />
      </div>
      <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto">
        <table className="w-full table-auto text-sm text-left bg-white">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr className="">
              <th className="py-3 px-4">NO</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Savings</th>
              <th className="py-3 px-4">Loan</th>
              <th className="py-3 px-4">Magalam</th>
              <th className="py-3 px-4">Fine</th>
              <th className="py-3 px-4">Interest</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Attendence</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {nameSearch.map((user, index) => (
              <tr key={user.id} className="">
                <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap font-bold">
                  {user.username}
                </td>
                <td className={`px-4 py-3 whitespace-nowrap`}>
                  {user.savings}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{user.loan}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user.magalam}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user.fine}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user.interest}</td>
                <td className="px-4 py-3 whitespace-nowrap font-bold">
                  {AddFunc(
                    user.savings,
                    user.loan,
                    user.magalam,
                    user.fine,
                    user.interest
                  ) || "0"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {user.attendence === 0 ? (
                    <input type="checkbox" name="" id="" disabled />
                  ) : (
                    <input type="checkbox" name="" id="" checked disabled />
                  )}
                </td>
                <td>
                  <button className='"py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-sm'>
                    <Link to={`/log/edit/${user.id}`}>Edit</Link>
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-200">
              <th className="px-4 py-3 whitespace-nowrap font-bold">Total</th>
              <td className="px-4 py-3 whitespace-nowrap font-bold"></td>
              <td className="px-4 py-3 whitespace-nowrap font-bold">
                {nameSearch.reduce((total, e) => total + Number(e.savings), 0)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-bold">
                {nameSearch.reduce((total, e) => total + Number(e.loan), 0)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-bold">
                {nameSearch.reduce((total, e) => total + Number(e.magalam), 0)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-bold">
                {nameSearch.reduce((total, e) => total + Number(e.fine), 0)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-bold">
                {nameSearch.reduce((total, e) => total + Number(e.interest), 0)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-bold">
                {nameSearch.length > 0
                  ? nameSearch.reduce(
                      (total, e) => total + Number(e.savings),
                      0
                    ) +
                    nameSearch.reduce((total, e) => total + Number(e.loan), 0) +
                    nameSearch.reduce(
                      (total, e) => total + Number(e.magalam),
                      0
                    ) +
                    nameSearch.reduce((total, e) => total + Number(e.fine), 0) +
                    nameSearch.reduce(
                      (total, e) => total + Number(e.interest),
                      0
                    )
                  : 0}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegiterView;
