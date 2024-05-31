import moment from "moment";
import React, { useState } from "react";
import { Ledger } from "../../MainFunctions";
import IncomeandExpenditureAccount from "./IncomeandExpenditureAccount";
import { Link } from "react-router-dom";

const BaletSheet = () => {
  const submenuNav = [{ title: "View", path: "/home" }];
  const apiCall = window.BackendAPI;
  const Date = moment().format("L");
  const toDay =
    Date.slice(6, 10) + "-" + Date.slice(0, 2) + "-" + Date.slice(3, 5);
  const [EndDate, SetEndDate] = useState(toDay);
  const [StartDate, SetStartDate] = useState("0");

  const result = Ledger(StartDate, EndDate);
  // console.log(result)
  const [balance, SetBalance] = useState();
  const [edit, setEdit] = useState(false);

  const Change = () => {
    setEdit(true);
  };
  const saveValue = () => {
    setEdit(false);
  };

  const data = {
    startDate: StartDate,
    endDate: EndDate,
    total_assets: result.total_Assets,
    loan_amount: result.loan,
    Additionalloan: result.AdditionalLoan.toFixed(2),
    other_income: result.income,
    other_expense: result.expense,
    magalam: result.magalam,
    balance: !balance ? result.balance.toFixed(2) : balance,
    prev_profit: result.prevProfit,
    extra_income: result.exraincome,
    bankinterest: result.bankinterest,
    fine: result.fine,
    interest: result.interest,

    total_income_side: result.totalLeft,
    total_expense_side:
      result.totalRight + (balance ? Number(balance) : result.balance),

    liability_total:
      result.total_Assets +
      (result.exraincome
        ? result.exraincome.reduce((t, e) => t + Number(e.ammount), 0)
        : 0),
    asset_total: result.loan + (balance ? Number(balance) : result.balance),
    profit_or_loss:
      result.loan +
      result.AdditionalLoan +
      (balance ? Number(balance) : result.balance) -
      (result.total_Assets +
        (result.exraincome
          ? result.exraincome.reduce((t, e) => t + Number(e.ammount), 0)
          : 0)),
  };
  return (
    <div className="w-full">
      <header className="text-base lg:text-sm">
        <nav className="border-b">
          <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
            {submenuNav.map((item, idx) => {
              return (
                // Replace [idx == 0] with [window.location.pathname == item.path]
                <li
                  key={idx}
                  className={`py-1 ${
                    idx === 0 ? "border-b-2 border-indigo-600" : ""
                  }`}
                >
                  <Link
                    to={item.path}
                    className="block py-2 px-3 rounded-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <div className="items-start justify-between mt-5 md:flex">
        <div className="max-w-lg">
          <p className="text-gray-600 mt-2">
            Specify a time range. by using this inputs
          </p>
        </div>
        <div className="flex gap-4">
          <div className="">
            <label for="firstname" className="text-sm">
              Start Date
            </label>
            <input
              id="firstname"
              type="date"
              className="w-full rounded-md  border-gray-300 text-gray-900"
              placeholder="00/00/0000"
              value={StartDate}
              onChange={(e) => SetStartDate(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label for="firstname" className="text-sm">
              End Date
            </label>
            <input
              id="firstname"
              type="date"
              className="w-full rounded-md  border-gray-300 text-gray-900"
              placeholder="00/00/0000"
              value={EndDate}
              onChange={(e) => SetEndDate(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 col-span-full gap-4">
        <div className="col-span-full lg:col-span-2">
          <IncomeandExpenditureAccount />
        </div>
        <div className="lg:col-span-3 col-span-full mt-10">
          <div className="w-full grid grid-cols-3"></div>
          <div className="flex mb-4">
            <h1 className="font-bold text-2xl">Balance Sheet</h1>
          </div>
          <div className="mt-2 shadow-md border rounded-sm overflow-x-auto  grid grid-cols-4">
            <div className="col-span-full grid grid-cols-4  bg-gray-50 border-b-">
              <div className="col-span-2  px-4 py-3 font-bold uppercase border-r-2  ">
                income
              </div>
              <div className="col-span-2  px-4 py-3 font-bold  uppercase">
                Expense
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-5 border-r-2 px-4 py-3 gap-3 ">
              <div className="col-span-3 font-bold uppercase">Total Assets</div>
              <div className="col-span-2 text-right">{result.total_Assets}</div>

              <div className="col-span-3 font-bold uppercase">
                <ul className="menu m-0 p-0">
                  <li>
                    <details open>
                      <summary className="font-bold uppercase pl-0 w-full">
                        Other Income
                      </summary>
                      {result.income.map((e) => (
                        <ul className="w-full ml-0">
                          <li className="w-full ">
                            <span className="pl-2 px-0 flex justify-between w-full">
                              <span className="font-bold uppercase">
                                {e.name}
                              </span>
                              <span className="font-normal">{e.ammount}</span>
                            </span>
                          </li>
                        </ul>
                      ))}
                    </details>
                  </li>
                </ul>
              </div>
              <div className="col-span-2 text-right flex items-center justify-end">
                {result.income.reduce(
                  (total, e) => total + Number(e.ammount),
                  0
                )}
              </div>
              <div className="col-span-3 font-bold uppercase">
                Bank interest
              </div>
              <div className="col-span-2 text-right ">
                {result.bankinterest}
              </div>

              <div className="col-span-3 font-bold uppercase">Interest</div>
              <div className="col-span-2 text-right ">{result.interest}</div>

              <div className="col-span-3 font-bold uppercase">Fine</div>
              <div className="col-span-2 text-right ">{result.fine}</div>

              <div className="col-span-3 font-bold uppercase">Magalam</div>
              <div className="col-span-2 text-right ">{result.magalam}</div>

              <div className="col-span-3 font-bold uppercase">
                previous Profit
              </div>
              <div className="col-span-2 text-right ">{result.prevProfit}</div>

              {result.exraincome ? (
                result.exraincome.map((e) => (
                  <>
                    <div className="col-span-3 font-bold uppercase">
                      {e.name}
                    </div>
                    <div className="col-span-2 text-right">
                      {Number(e.ammount) || 0}
                    </div>
                  </>
                ))
              ) : (
                <p></p>
              )}
            </div>

            <div className="col-span-2 grid grid-cols-5 px-4 py-3">
              <div className="col-span-3 font-bold uppercase">Loan Amount</div>
              <div className="col-span-2 text-right">{result.loan}</div>
              <div className="col-span-3 font-bold uppercase">
                Additional Loan Amount
              </div>
              <div className="col-span-2 text-right">
                {result.AdditionalLoan.toFixed(2)}
              </div>
              <div className="col-span-3 font-bold uppercase">
                <ul className="menu m-0 p-0">
                  <li>
                    <details open>
                      <summary className="font-bold uppercase pl-0 w-full">
                        {" "}
                        other Expense
                      </summary>
                      {result.expense.map((e) => (
                        <ul className="w-full ml-0">
                          <li className="w-full ">
                            <a className="pl-2 px-0 flex justify-between w-full">
                              <span className="font-bold uppercase">
                                {e.name}
                              </span>
                              <span className="font-normal">{e.ammount}</span>
                            </a>
                          </li>
                        </ul>
                      ))}
                    </details>
                  </li>
                </ul>
              </div>
              <div className="col-span-2 text-right">
                {result.expense.reduce(
                  (total, e) => total + Number(e.ammount),
                  0
                )}
              </div>
              <div className="col-span-3 font-bold uppercase flex justify-between items-center">
                <span>Balance</span>
                <button className="font-normal text-blue-500" onClick={Change}>
                  Edit
                </button>{" "}
              </div>
              <div className="col-span-2 text-right">
                {!balance ? result.balance.toFixed(2) : balance}
              </div>
              {edit ? (
                <div className="col-span-full ">
                  <form
                    onSubmit={saveValue}
                    className="flex justify-between items-center gap-4"
                  >
                    <input
                      type="number"
                      value={balance}
                      onChange={(e) => SetBalance(e.target.value)}
                      className="w-full rounded-md  border-gray-300 text-gray-900"
                      placeholder="Edit balance"
                    />
                    <button
                      type="submit"
                      className="text-white bg-blue-500 px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                  </form>
                </div>
              ) : (
                <p></p>
              )}
            </div>
            <div className="col-span-full grid grid-cols-4  bg-gray-50">
              <div className="col-span-2 text-right px-4 py-3 font-bold border-r-2  underline underline-offset-2 ">
                {result.totalLeft}
              </div>
              <div className="col-span-2 text-right px-4 py-3 font-bold  underline underline-offset-2">
                {result.totalRight +
                  (balance ? Number(balance) : result.balance)}
              </div>
            </div>
          </div>
          <div className="flex mb-4 mt-10">
            <h1 className="font-bold text-2xl">Profit & Loss</h1>
          </div>
          <div className="mt-2 shadow-md border rounded-sm overflow-x-auto col-span-full  grid grid-cols-4">
            <div className="col-span-full grid grid-cols-4  bg-gray-50 border-b-">
              <div className="col-span-2  px-4 py-3 font-bold uppercase border-r-2  ">
                Liability
              </div>
              <div className="col-span-2  px-4 py-3 font-bold  uppercase">
                Asset{" "}
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-5 border-r-2 px-4 py-3 gap-3 ">
              <div className="col-span-3 font-bold uppercase">total Assets</div>
              <div className="col-span-2 text-right">{result.total_Assets}</div>
              {result.exraincome ? (
                result.exraincome.map((e) => (
                  <>
                    <div className="col-span-3 font-bold uppercase">
                      {e.name}
                    </div>
                    <div className="col-span-2 text-right">{e.ammount}</div>
                  </>
                ))
              ) : (
                <p></p>
              )}
            </div>
            <div className="col-span-2 grid grid-cols-5 border-r-2 px-4 py-3 gap-3 ">
              <div className="col-span-3 font-bold uppercase">Loan AMOUNT</div>
              <div className="col-span-2 text-right">{result.loan}</div>
              <div className="col-span-3 font-bold uppercase">
                {" "}
                Additional Loan AMOUNT
              </div>
              <div className="col-span-2 text-right">
                {result.AdditionalLoan}
              </div>
              <div className="col-span-3 font-bold uppercase">Balance</div>
              <div className="col-span-2 text-right">
                {balance
                  ? Number(balance.toFixed(2))
                  : result.balance.toFixed(2)}
              </div>
            </div>
            <div className="col-span-full grid grid-cols-4  bg-gray-50 border-b-2">
              <div className="col-span-2 text-right px-4 py-3 font-bold border-r-2  underline underline-offset-2 ">
                {result.total_Assets +
                  (result.exraincome
                    ? result.exraincome.reduce(
                        (t, e) => t + Number(e.ammount),
                        0
                      )
                    : 0)}
              </div>
              <div className="col-span-2 text-right px-4 py-3 font-bold  underline underline-offset-2">
                {result.loan + (balance ? Number(balance) : result.balance)}
              </div>
            </div>
            <div className="col-span-full grid-cols-3 bg-gray-50 flex gap-4 font-bold justify-end px-4 py-3 text-lg">
              {result.loan +
                (balance ? Number(balance) : result.balance) -
                (result.total_Assets +
                  (result.exraincome
                    ? result.exraincome.reduce(
                        (t, e) => t + Number(e.ammount),
                        0
                      )
                    : 0)) >
              0 ? (
                <p className="text-green-400">
                  Profit :{" "}
                  {result.loan +
                    result.AdditionalLoan +
                    (balance ? Number(balance) : result.balance) -
                    (result.total_Assets +
                      (result.exraincome
                        ? result.exraincome.reduce(
                            (t, e) => t + Number(e.ammount),
                            0
                          )
                        : 0))}{" "}
                </p>
              ) : (
                <p className="text-red-600">
                  Loss :{" "}
                  {result.loan +
                    result.AdditionalLoan +
                    (balance ? Number(balance) : result.balance) -
                    (result.total_Assets +
                      (result.exraincome
                        ? result.exraincome.reduce(
                            (t, e) => t + Number(e.ammount),
                            0
                          )
                        : 0))}{" "}
                </p>
              )}
            </div>
          </div>
          <button
            className="px-6 ml-auto col-span-3 mt-6 w-48 h-10 text-white bg-green-600 rounded-md duration-150 hover:bg-green-300 active:shadow-lg   "
            onClick={() => apiCall.send("print-to-pdf", JSON.stringify(data))}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaletSheet;
