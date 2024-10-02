import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiCall = window.FrontendAPI;
  const [data, SetData] = useState();
  const [Info, setInfo] = useState([]);
  const [FetchData, SetFetchData] = useState();
  const [fetchLoan, SetFetchLoan] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiCall.gettemp();
        SetData(data);
        const data1 = await apiCall.MemberInfo();
        setInfo(data1);
        const data2 = await apiCall.LogData();
        SetFetchData(data2);
        const loan = await apiCall.LoanInfo();
        SetFetchLoan(loan);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  var userInfo;

  if (data && Info) {
    var josnString = data[0].text;
    josnString = JSON.parse(josnString);
    userInfo = Info.find((e, i) => e.name === josnString.name);
  }
  let sortData = [];
  if (data && FetchData) {
    FetchData.map((e) => {
      if (e.username == josnString.name) {
        sortData.push(e);
      }
    });
  }
  const totalAmount = sortData.reduce((total, e) => total + e.savings, 0);
  let test = totalAmount;
  let sortAmount;
  let SortDate;
  let loanArray = [];
  if (fetchLoan) {
    fetchLoan.map((e) => {
      if (e.name == josnString.name) {
        loanArray.push(e);
      }
    });

    if (loanArray && loanArray.length > 0) {
      console.log(loanArray);
      const lastLoan = loanArray[loanArray.length - 1];
      SortDate = lastLoan.date;
      sortAmount = lastLoan.interest;
    }
  }
  const SortDateList = sortData.filter(
    (date) => new Date(date.date) >= new Date(SortDate)
  );
  let test2 = sortAmount;
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h1 className="font-black nato text-2xl">
          ഹരിശ്രീ സ്വയംസഹായ സംഘം,കാവുംവട്ടം
        </h1>
        <h1
          className="font-bold nato text-lg
      "
        >
          Reg No. 597/IDC
        </h1>
      </div>
      <div className="flex justify-center w-full flex-col mt-6">
        {userInfo && (
          <div className="">
            <table>
              <tr>
                <th colSpan={2} className="text-left px-2 py-1 ">
                  Name
                </th>{" "}
                <td colSpan={3} className="px-2 py-1 font-bold">
                  {josnString.name}
                </td>
              </tr>
              <tr>
                <th colSpan={2} className="text-left px-2 py-1 ">
                  Total Savings
                </th>{" "}
                <td colSpan={3} className="px-2 py-1">
                  {userInfo.totalsavings}
                </td>
              </tr>
              <tr>
                <th colSpan={2} className="text-left px-2 py-1">
                  Pending Savings
                </th>{" "}
                <td colSpan={3} className="px-2 py-1">
                  {userInfo.pendingsavings}
                </td>
              </tr>
              <tr>
                <th colSpan={2} className="text-left px-2 py-1">
                  Pending Magalam
                </th>{" "}
                <td colSpan={3} className="px-2 py-1">
                  {" "}
                  {userInfo.pendingmagalam}
                </td>
              </tr>
              <tr>
                <th colSpan={2} className="text-left px-2 py-1">
                  Fine
                </th>{" "}
                <td colSpan={3} className="px-2 py-1">
                  {" "}
                  {userInfo.fine}
                </td>
              </tr>
              <tr>
                <th colSpan={2} className="text-left px-2 py-1">
                  Interest
                </th>{" "}
                <td colSpan={3} className="px-2 py-1">
                  {userInfo.interest}
                </td>
              </tr>
              <tr>
                <th colSpan={2} className="text-left px-2 py-1">
                  Loan Amount
                </th>{" "}
                <td colSpan={3} className="px-2 py-1">
                  {userInfo.loan || 0}
                </td>
              </tr>
              <tr>
                <th colSpan={2} className="text-left px-2">
                  Additional Loan
                </th>{" "}
                <td colSpan={3} className="px-2 py-1">
                  {userInfo.Additionalloan || 0}
                </td>
              </tr>
              <tr>
                <th colSpan={5} className="py-3">
                  <h1 className="text-xl">Savings Details</h1>
                </th>
              </tr>
              <tr>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Initial amount</th>

                <th className="py-3 px-6">collected amount</th>
                <th colSpan={2} className="py-3 px-6">
                  Total amount
                </th>
              </tr>

              {sortData.reverse().map((item, index) => {
                test -= item.savings;

                if (item.savings > 0) {
                  return (
                    <tr key={index}>
                      <td className="px-3 py-1 whitespace-nowrap uppercase">
                        {item.date}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap">{test}</td>
                      <td className="px-3 py-1 whitespace-nowrap">
                        {item.savings}
                      </td>
                      <td colSpan={2} className="px-3 py-1 whitespace-nowrap">
                        {test + item.savings}
                      </td>
                      {/* <td className="px-3 py-1 whitespace-nowrap">{test}</td> */}
                    </tr>
                  );
                }
              })}
              <tr>
                {" "}
                <th colSpan={3}>Total amount</th>
                <th colSpan={2} className="text-left px-2">
                  {totalAmount}
                </th>
              </tr>
              <tr>
                <th colSpan={5} className="py-3">
                  <h1 className="text-xl">Loan Details</h1>
                </th>
              </tr>
              <tr>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Initial amount</th>
                <th className="py-3 px-6">Total amount</th>
                <th className="py-3 px-6">collected amount</th>
                <th className="py-3 px-6">Pending amount</th>
              </tr>

              {SortDateList.map((item, index) => {
                test2 -= item.loan;

                if (test2 >= 0 && item.loan != 0) {
                  return (
                    <tr key={index}>
                      <td className="px-3 py-1 whitespace-nowrap  uppercase">
                        {item.date}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap">
                        {test2 + item.loan}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap">
                        {test2 + item.loan}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap">
                        {item.loan}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap">{test2}</td>
                    </tr>
                  );
                }
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
