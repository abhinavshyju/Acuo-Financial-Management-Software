import moment from "moment";
import React, { useEffect, useState } from "react";

const Monthlyrecod = () => {
  const Data = window.FrontendAPI;
  const [user, setUserData] = useState([]);
  const [sortDate, setSortDate] = useState(moment().format("YYYY-MM"));
  const [userdata, setuserdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await Data.LogData();
      setUserData(data);
      const data2 = await Data.MemberInfo();
      setuserdata(data2);
    };
    fetchData();
  }, [Data]);

  const [year, month] = sortDate.split("-");
  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(`${year}-${month}-31`);

  const monthlyData = user.filter(({ date }) => {
    const [m, d, y] = date.split("/");
    const userDate = new Date(`${y}-${m}-${d}`);
    return userDate >= startDate && userDate <= endDate;
  });
  const totalloan = (username) => {
    const total = monthlyData.filter((data) => data.username === username);
    console.log(total);
    const total2 = total.reduce((total, e) => total + e.loan, 0);

    console.log(total2);
    return total2;
  };
  const totalsavings = (username) => {
    const total = monthlyData.filter((data) => data.username === username);
    const total2 = total.reduce((total, e) => total + e.savings, 0);

    return total2;
  };
  return (
    <div className="mx-auto px-4 md:px-6 mt-10 pb-10">
      <div className="flex mb-8">
        <h1 className="font-bold text-4xl">Monthly Record</h1>
      </div>
      <div className="items-start justify-between mt-8 md:flex border-t-2 pt-3">
        <div className="max-w-lg">
          <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl">
            Monthly record view.
          </h3>
          <p className="text-neutral-600 mt-3">
            Monthly record Activities view section
          </p>
        </div>
        <input
          type="month"
          className="input input-bordered input-info date-in"
          value={sortDate}
          onChange={(e) => setSortDate(e.target.value)}
        />
      </div>
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
          {userdata ? (
            <tbody className="text-gray-600 divide-y">
              {userdata.map((item, index) => (
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
};

export default Monthlyrecod;
