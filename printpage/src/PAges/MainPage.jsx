import moment from "moment";
import React, { useEffect, useState } from "react";

const MainPage = () => {
  const Date = moment().format("L");
  const apiCall = window.FrontendAPI;
  const [data, SetData] = useState([]);
  const [Memberdata, SetMemberdata] = useState([]);

  useEffect(() => {
    async function fetch() {
      const data1 = await apiCall.gettemp();
      const data2 = await apiCall.MemberInfo();
      SetMemberdata(data2);
      SetData(data1);
    }
    fetch();
  }, []);
  // console.log(data);
  let s = 0;
  if (data && data.length > 0) {
    const jsonString = data[0].text;

    try {
      SetData(JSON.parse(jsonString));
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
    }
  } else {
    console.error("Data is empty or undefined.");
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="">
        <h1 className="font-black nato text-2xl">
          ഹരിശ്രീ സ്വയംസഹായ സംഘം,കാവുംവട്ടം
        </h1>
        <h1
          className="font-bold nato text-lg
      "
        >
          Reg No. 597/IDC
        </h1>
        <h1 className="font-bold nato text-lg">Audit Report - {Date}</h1>
      </div>
      <table>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Savings</th>
          <th></th>
          <th>Pending Loan</th>
        </tr>
        {Memberdata ? (
          <>
            {" "}
            {Memberdata.map((e, index) => (
              <tr key={e.id}>
                <td className="px-2 py-1">{index + 1}</td>
                <td className="px-2 py-1">{e.name}</td>
                <td className="px-2 py-1">{e.totalsavings || 0}</td>
                <td></td>
                <td className="px-2 py-1">{e.loan || 0}</td>
              </tr>
            ))}
            <tr>
              <th></th>
              <th className="px-2 py-1">Total</th>
              <th className="px-2 py-1 font-bold">
                {Memberdata
                  ? Memberdata.reduce(
                      (total, e) => total + Number(e.totalsavings),
                      0
                    )
                  : 0}
              </th>
              <th></th>
              <th className="px-2 py-1 font-bold">
                {Memberdata
                  ? Memberdata.reduce((total, e) => total + Number(e.loan), 0)
                  : 0}
              </th>
            </tr>
          </>
        ) : (
          <>
            <h1>Loading .......</h1>
          </>
        )}
        <tr>
          <th>&#8203;</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        {data ? (
          <>
            {" "}
            <tr>
              <td></td>
              <td className="px-2 py-1">Total savings</td>
              <td className="px-2 py-1">{data.total_assets}</td>
              <td className="px-2 py-1">Pending loan</td>
              <td className="px-2 py-1"> {data.loan_amount}</td>
            </tr>
            <tr>
              <td></td>
              <td className="px-2 py-1">Other income</td>
              <td className="px-2 py-1">
                {data.other_income
                  ? data.other_income.reduce((t, e) => t + Number(e.ammount), 0)
                  : 0}
              </td>
              <td className="px-2 py-1">Other expense</td>
              <td className="px-2 py-1">
                {data.other_expense
                  ? data.other_expense.reduce(
                      (t, e) => t + Number(e.ammount),
                      0
                    )
                  : 0}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="px-2 py-1">Bank interest</td>
              <td className="px-2 py-1">{data.bankinterest || 0}</td>
              <td className="px-2 py-1">Additional loan</td>
              <td className="px-2 py-1">{data.Additionalloan}</td>
            </tr>
            <tr>
              <td></td>
              <td className="px-2 py-1">Interest</td>
              <td className="px-2 py-1"> {data.interest || 0}</td>
              <td className="px-2 py-1">{`Balance(bank/in hand)`}</td>
              <td className="px-2 py-1"> {data.balance || 0}</td>
            </tr>
            <tr>
              <td></td>
              <td className="px-2 py-1">Fine</td>
              <td className="px-2 py-1"> {data.fine || 0}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td className="px-2 py-1">Magalam</td>
              <td className="px-2 py-1"> {data.magalam}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td className="px-2 py-1"> Previous Profit</td>
              <td className="px-2 py-1"> {data.prev_profit}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th className="px-2 py-1">Total Left Side</th>
              <th className="px-2 py-1"> {data.total_income_side}</th>
              <th className="px-2 py-1">Total Right Side</th>
              <th className="px-2 py-1"> {data.total_expense_side || 0}</th>
            </tr>
          </>
        ) : (
          <></>
        )}
      </table>
    </div>
  );
};

export default MainPage;
