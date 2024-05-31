import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import RegisterSubNav from "../../Components/NanoComponents/RegisterSubNav";
const WeeklyRecord = () => {
  const Data = window.FrontendAPI;
  const DataFrom = window.FrontendAPI;

  const [userData, setUserData] = useState([]);
  const [expense, Setexpense] = useState([]);

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
        const data2 = await DataFrom.expenseInfo();
        Setexpense(data2);
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
  let expenseTotal = 0;
  let incomeTotal = 0;
  const expenseArray = [];
  const IncomeArray = [];
  console.log(expense);
  if (expense) {
    expense.map((e) => {
      if (e.date === CheckDate) {
        if (e.type !== "income") {
          expenseArray.push(e);
          expenseTotal = expenseTotal + Number(e.ammount);
        } else {
          IncomeArray.push(e);

          incomeTotal = incomeTotal + Number(e.ammount);
        }
      }
    });
  }
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
        <h1 className="font-bold text-4xl">Weekly Record</h1>
      </div>
      {/* <RegisterSubNav id="1" /> */}
      <div className="items-start justify-between mt-8 md:flex border-t-2 pt-3">
        <div className="max-w-lg ">
          <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl">
            Weekly record view
          </h3>
          <p className="text-neutral-600 mt-3">
            Weekly record Activities view section
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
                <td className="px-4 py-3 whitespace-nowrap  ">
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
      <div className="grid grid-cols-2 gap-3">
        <div className="mt-6">
          <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl">
            Expense
          </h3>
          <div className="shadow-sm border rounded-sm overflow-x-auto mt-3">
            <table className="w-full table-auto text-sm text-left bg-white">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">NO</th>
                  {/* <th className="py-3 px-6">Date</th> */}
                  <th className="py-3 px-6">Purpose</th>
                  <th className="py-3 px-6">Amount</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {expenseArray.map((e, index) => (
                  <tr key={e.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                      {e.date}
                    </td> */}
                    <td className="px-6 py-4 whitespace-pre-wrap">{e.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{e.ammount}</td>
                    {/* <td className="px-6 whitespace-nowrap leading-none  font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-sm"><button onClick={()=>DeleteFun(e.id)}>Delete</button></td> */}
                  </tr>
                ))}
                <tr className="bg-gray-200">
                  <th className="px-4 py-3 whitespace-nowrap font-bold">
                    Total
                  </th>
                  <td></td>
                  {/* <td></td> */}

                  <td className="px-4 py-3 whitespace-nowrap font-bold">
                    {expenseTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl">
            Income
          </h3>
          <div className="shadow-sm border rounded-sm overflow-x-auto mt-3">
            <table className="w-full table-auto text-sm text-left bg-white">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">NO</th>
                  {/* <th className="py-3 px-6">Date</th> */}
                  <th className="py-3 px-6">Purpose</th>
                  <th className="py-3 px-6">Amount</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {IncomeArray.map((e, index) => (
                  <tr key={e.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                      {e.date}
                    </td> */}
                    <td className="px-6 py-4 whitespace-pre-wrap">{e.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{e.ammount}</td>
                    {/* <td className="px-6 whitespace-nowrap leading-none  font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-sm"><button onClick={()=>DeleteFun(e.id)}>Delete</button></td> */}
                  </tr>
                ))}
                <tr className="bg-gray-200">
                  <th className="px-4 py-3 whitespace-nowrap font-bold">
                    Total
                  </th>
                  <td></td>
                  {/* <td></td> */}

                  <td className="px-4 py-3 whitespace-nowrap font-bold">
                    {incomeTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className=" w-full mt-12">
        <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl">
          Total accounts
        </h3>
        <table className="w-full table-auto text-sm text-left bg-white">
          <tbody className="text-neutral-700 font-bold divide-y">
            <tr>
              <td className="px-6 py-4 whitespace-pre-wrap">
                Amount Collected :{" "}
              </td>
              <td className="px-6 py-4 whitespace-pre-wrap">
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
                    nameSearch.reduce(
                      (total, e) => total + Number(e.interest),
                      0
                    )
                  : 0}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-pre-wrap">Income : </td>
              <td className="px-6 py-4 whitespace-pre-wrap">{incomeTotal}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-pre-wrap">Expense : </td>
              <td className="px-6 py-4 whitespace-pre-wrap">{expenseTotal}</td>
            </tr>
            <tr className="bg-gray-200">
              <th className="px-6 py-4 whitespace-nowrap font-bold text-lg">
                Total
              </th>

              <td className="px-6 py-4 whitespace-nowrap font-bold">
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
                    nameSearch.reduce(
                      (total, e) => total + Number(e.interest),
                      0
                    ) +
                    incomeTotal -
                    expenseTotal
                  : 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyRecord;
