import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseNAv from "../../Components/NanoComponents/ExpenseandIncomeSubNAv";
import Select from "react-select";
import { BankInfo } from "../../MainFunctions";
import { ToastContainer, toast } from "react-toastify";

const Expense = () => {
  const backendapi = window.BackendAPI;
  const frontendapi = window.FrontendAPI;
  const Date = moment().format("L");
  const toDay =
    Date.slice(6, 10) + "-" + Date.slice(0, 2) + "-" + Date.slice(3, 5);
  const [sortDate, SetsortDate] = useState(toDay);

  const SortDate =
    sortDate.slice(5, 7) +
    "/" +
    sortDate.slice(8, 10) +
    "/" +
    sortDate.slice(0, 4);

  const BankName = BankInfo();

  const [limitStart, SetlimitStart] = useState(0);
  const [limitEnd, SetlimitEnd] = useState(14);
  const [AddExpense, SetAddExpense] = useState("");
  const [name, Setname] = useState("");
  const [expense, Setexpense] = useState("");
  const [bank, setbank] = useState("");

  useEffect(() => {
    async function FetchData() {
      const data = await frontendapi.expenseInfo();
      Setexpense(data);
    }
    FetchData();
  }, []);

  const submit = (e) => {
    e.preventDefault();

    const data = {
      date: SortDate,
      name: name,
      amount: AddExpense,
      type: "expense",
      bank: bank,
    };
    // console.log(data)
    if (name && AddExpense && bank !== "") {
      backendapi.send("expense", data);
      toast.success("Expense added successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Setname("");
      SetAddExpense("");
    }
  };
  const expenses = [];
  let total = 0;
  if (expense) {
    expense.map((e) => {
      if (e.type == "expense") {
        expenses.push(e);
        total = total + Number(e.ammount);
      }
    });
  }
  useEffect(() => {
    async function FetchData() {
      const data = await frontendapi.expenseInfo();
      Setexpense(data);
    }
    FetchData();
  }, [submit]);
  // expenseDelete
  const DeleteFun = (id) => {
    const data = { id: id };
    backendapi.send("expenseDelete", data);
  };
  return (
    <>
      {expenses ? (
        <div className="mx-auto px-4 md:px-6 mt-10">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="flex mb-8">
            <h1 className="font-bold text-4xl">Expenses & Income</h1>
          </div>
          <ExpenseNAv id="0" />
          <div className="items-start justify-between mt-5 md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Add New Expense
              </h3>
              <p className="text-gray-600 mt-2">
                Seamlessly input new expenses for accurate financial records.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 ">
            <div className="col-span-full md:col-span-2">
              <label for="firstname" className="text-sm">
                Expense Details
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Details"
                className="w-full rounded-md  border-gray-300 text-gray-900"
                value={name}
                onChange={(e) => Setname(e.target.value)}
                required
              />
            </div>
            <div className="col-span-full md:col-span-2">
              <label for="lastname" className="text-sm">
                Amount
              </label>
              <input
                id="lastname"
                type="number"
                placeholder="Amount"
                className="w-full rounded-md  border-gray-300 text-gray-900"
                value={AddExpense}
                onChange={(e) => SetAddExpense(e.target.value)}
                required
              />
            </div>
            <div className="col-span-full md:col-span-1">
              <label for="firstname" className="text-sm">
                Bank Name
              </label>
              <Select
                className="flex-1 lg:flex-none rounded-md  border-gray-300 text-gray-900 w-52 "
                options={
                  BankName
                    ? BankName.map((e) => ({
                        label: e.bankname,
                        value: e.bankname || false,
                      }))
                    : "Nothing"
                }
                onChange={(e) => setbank(e.value)}
                required
              />
            </div>
            <div className="col-span-full md:col-span-3 lg:col-span-2 lg:ml-0 ml-0">
              <label for="firstname" className="text-sm">
                Set Date
              </label>
              <input
                id="firstname"
                type="date"
                className="w-full rounded-md  border-gray-300 text-gray-900"
                placeholder={toDay}
                value={sortDate}
                onChange={(e) => SetsortDate(e.target.value)}
              />
            </div>
            <div className="col-span-full md:col-span-1 flex items-end justify-end">
              <button
                onClick={submit}
                className=" px-6 ml-auto  mr-6 w-48 h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="max-w-lg mt-8 col-span-3">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl ">
                Expenses Record
              </h3>
              <p className="text-gray-600 mt-2">
                Efficiently log and track all your business expenditures
              </p>
            </div>
            <div className="col-span-1 flex justify-center items-end ">
              <h1 className="font-bold text-xl">Total Amount : {total}</h1>
            </div>
          </div>
          <div className="mt-5 shadow-sm border rounded-sm overflow-x-auto ">
            <table className="w-full table-auto text-sm text-left bg-white">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">NO</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Purpose</th>
                  <th className="py-3 px-6">Amount</th>
                  {/* <td></td> */}
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {[...expenses]
                  .reverse()
                  .slice(limitStart, limitEnd + 1)
                  .map((e, index) => (
                    <tr key={e.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                        {e.date}
                      </td>
                      <td className="px-6 py-4 ">{e.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {e.ammount}
                      </td>
                      {/* <td className="px-6 whitespace-nowrap leading-none  font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-sm"><button onClick={()=>DeleteFun(e.id)}>Delete</button></td> */}
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
        <p></p>
      )}
    </>
  );
};

export default Expense;
