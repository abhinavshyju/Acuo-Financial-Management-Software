import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const apiCall = window.FrontendAPI;
  const [Info, SetData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiCall.gettemp();
        SetData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  var josnString;
  if (Info) {
    josnString = Info[0].text;
    josnString = JSON.parse(josnString);
  }
  const totalloan = (username) => {
    const total = josnString.data_two.filter(
      (data) => data.username === username
    );
    console.log(total);
    const total2 = total.reduce((total, e) => total + e.loan, 0);

    console.log(total2);
    return total2;
  };
  const totalsavings = (username) => {
    const total = josnString.data_two.filter(
      (data) => data.username === username
    );
    const total2 = total.reduce((total, e) => total + e.savings, 0);

    return total2;
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center mb-3">
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
      <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl mb-3">
        Monthly record Details
      </h3>
      <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto">
        <table className="w-full table-auto text-sm text-left bg-white">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-4">NO</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Savings</th>
              <th className="py-3 px-4">Loan</th>
            </tr>
          </thead>
          {josnString && josnString.data_one ? (
            <tbody className="text-gray-600 divide-y">
              {josnString.data_one.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{totalsavings(item.name)}</td>
                  <td className="py-3 px-4">{totalloan(item.name)}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
