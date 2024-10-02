import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';

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
  return (
    <div className='flex flex-col items-center'>
      <div className="flex flex-col items-center mb-2">
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
      <h3 className="text-gray-800 text-2xl font-bold sm:text-2xl mb-3">
        Members Details
      </h3>
      <table className="w-full table-auto text-sm text-left bg-white">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th className="py-1">NO</th>
            <th className="py-1">Name</th>
            <th className="py-1">Total Savings</th>
            <th className="py-1">Pending Savings</th>
            <th className="py-1">Pending Magalam</th>
            <th className="py-1">Fine</th>
            <th className="py-1">Interest</th>
            <th className="py-1">Loan Amount</th>
            <th className="py-1">Additional Loan</th>
          </tr>
        </thead>
        {josnString && <tbody className="text-gray-600 divide-y">
          {josnString.map((e, index) => (
            <tr key={e.id}>
              <td className="px-2 py-1 whitespace-nowrap">{index + 1}</td>
              <td className="px-2 py-1 whitespace-nowrap font-bold uppercase">
                {e.name}
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                {e.totalsavings}
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                {e.pendingsavings}
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                {e.pendingmagalam}
              </td>
              <td className="px-2 py-1 whitespace-nowrap">{e.fine}</td>
              <td className="px-2 py-1 whitespace-nowrap">{e.interest}</td>
              <td className="px-2 py-1 whitespace-nowrap">{e.loan || 0}</td>
              <td className="px-2 py-1 whitespace-nowrap">
                {e.Additionalloan || 0}
              </td>
            </tr>
          ))}
        </tbody>}

      </table></div>
  );
}

export default App;
