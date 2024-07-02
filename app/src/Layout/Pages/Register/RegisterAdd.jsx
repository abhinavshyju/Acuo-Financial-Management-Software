import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import SubNav from "../../Components/NanoComponents/SubNav";
import RegisterSubNav from "../../Components/NanoComponents/RegisterSubNav";
import Select from "react-select";
import WarnningNotification from "../../Components/NanoComponents/WarnningNotification";
import { BankInfo } from "../../MainFunctions";
import { ToastContainer, toast } from "react-toastify";

const RegisterAdd = () => {
  const datatoback = window.BackendAPI;
  const dataFrom = window.FrontendAPI;

  const [Info, setInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await dataFrom.MemberInfo();
        setInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

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
  console.log(SortDate);

  const BankName = ["Bank 1", "Bank 2"];

  const [name, setName] = useState("");
  const [bank, setbank] = useState("");
  const [alert, setalert] = useState(false);

  const [userSavings, setUserSavings] = useState({});
  const [userLoan, setUserLoan] = useState({});
  const [userMagalam, setUserMagalam] = useState({});
  const [userFine, setUserFine] = useState({});
  const [userInterest, setUserInterest] = useState({});
  const [userGave, setUserGave] = useState({});
  const [userAttendence, setUserAttendence] = useState({});

  const Bank = BankInfo();

  const handleInputChange = (e, userName, category) => {
    const { value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    switch (category) {
      case "savings":
        setUserSavings((prevUserSavings) => ({
          ...prevUserSavings,
          [userName]: newValue,
        }));
        break;
      case "loan":
        setUserLoan((prevUserLoan) => ({
          ...prevUserLoan,
          [userName]: newValue,
        }));
        break;
      case "magalam":
        setUserMagalam((prevUserMagalam) => ({
          ...prevUserMagalam,
          [userName]: newValue,
        }));
        break;
      case "fine":
        setUserFine((prevUserFine) => ({
          ...prevUserFine,
          [userName]: newValue,
        }));
        break;
      case "interest":
        setUserInterest((prevUserInterest) => ({
          ...prevUserInterest,
          [userName]: newValue,
        }));
        break;
      case "gave":
        setUserGave((prevUserGave) => ({
          ...prevUserGave,
          [userName]: newValue,
        }));
        break;
      case "attendence":
        setUserAttendence((prevUserAttendence) => ({
          ...prevUserAttendence,
          [userName]: newValue,
        }));
        break;
      default:
        break;
    }
  };
  const AddFunc = (save, loa, maga, fin, inter) => {
    const saving = parseInt(save) || 0;
    const loan = parseInt(loa) || 0;
    const magalam = parseInt(maga) || 0;
    const fine = parseInt(fin) || 0;
    const interest = parseInt(inter) || 0;

    const Sum = saving + loan + magalam + fine + interest;
    return Sum;
  };

  const SaveFunc = (event) => {
    event.preventDefault();

    const allData = Info.map((user) => ({
      date: SortDate,
      username: user.name,
      savings: userSavings[user.name] || 0,
      loan: userLoan[user.name] || 0,
      magalam: userMagalam[user.name] || 0,
      fine: userFine[user.name] || 0,
      interest: userInterest[user.name] || 0,
      // gave: userGave[user.name] || 0,
      attendence: userAttendence[user.name] || false,
      total:
        AddFunc(
          userSavings[user.name],
          userLoan[user.name],
          userMagalam[user.name],
          userFine[user.name],
          userInterest[user.name]
        ) || "0",
    }));

    const total_amount = Info.reduce((acc, user) => {
      return (
        acc +
        (AddFunc(
          userSavings[user.name],
          userLoan[user.name],
          userMagalam[user.name],
          userFine[user.name],
          userInterest[user.name]
        ) || 0)
      );
    }, 0);

    const bankData = {
      date: SortDate,
      name: name,
      bank: bank,
      ammount: total_amount,
      type: "deposit",
    };

    if (name && bank) {
      datatoback.send("LogData", allData);
      datatoback.send("bankLog", bankData);

      toast.success("Weekly record added.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/log");
      }, 2000);
    } else {
      console.log("error");
      setalert(true);
      setTimeout(() => {
        setalert(false);
      }, 5000);
    }
  };

  return (
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
        <h1 className="font-bold text-4xl">Accounts</h1>
      </div>
      <RegisterSubNav id="0" />
      <div className="items-start justify-between mt-8 lg:flex">
        <div className="max-w-lg">
          <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl">
            Weekly Fundraising Activities
          </h3>
          <p className="text-neutral-600 mt-3">
            Weekly fundraising Activities adding section
          </p>
        </div>
      </div>
      {alert ? (
        <div className="w-full left-0 m-0 absolute bottom-3">
          <WarnningNotification message="Please fill bank name and depositor name" />
        </div>
      ) : (
        <p></p>
      )}
      <div className="flex justify-between mt-10">
        <div className="flex gap-5 ">
          <div className="">
            <label for="firstname" className="text-sm">
              Depositor name
            </label>
            <Select
              className="flex-1 lg:flex-none rounded-md  text-gray-900 w-52 input-info"
              options={Info.map((e) => ({
                label: e.name,
                value: e.name || false,
              }))}
              onChange={(e) => setName(e.value)}
              required
            />
          </div>
          <div className="">
            <label for="firstname" className="text-sm">
              Bank Name
            </label>
            <Select
              className="flex-1 lg:flex-none rounded-md  border-gray-300 text-gray-900 w-52 "
              options={
                Bank
                  ? Bank.map((e) => ({
                      label: e.bankname,
                      value: e.bankname || false,
                    }))
                  : false
              }
              onChange={(e) => setbank(e.value)}
              required
            />
          </div>
          <div className="">
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
        </div>
        <button
          onClick={SaveFunc}
          className=" mt-5 px-6 my-auto w-48 h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="mt-2 shadow-sm border rounded-sm overflow-x-auto mb-12">
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
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {Info.map((user, index) => (
              <tr key={user.id} className="">
                <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap font-bold">
                  {user.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap  ">
                  <input
                    type="number"
                    className="w-full rounded-md  border-gray-300 text-gray-900  h-8"
                    value={userSavings[user.name] || ""}
                    onChange={(e) => handleInputChange(e, user.name, "savings")}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <input
                    type="number"
                    className="w-full rounded-md  border-gray-300 text-gray-900  h-8"
                    value={userLoan[user.name] || ""}
                    onChange={(e) => handleInputChange(e, user.name, "loan")}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <input
                    type="number"
                    className="w-full rounded-md  border-gray-300 text-gray-900  h-8"
                    value={userMagalam[user.name] || ""}
                    onChange={(e) => handleInputChange(e, user.name, "magalam")}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <input
                    type="number"
                    className="w-full rounded-md  border-gray-300 text-gray-900  h-8"
                    value={userFine[user.name] || ""}
                    onChange={(e) => handleInputChange(e, user.name, "fine")}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <input
                    type="number"
                    className="w-full rounded-md  h-8 border-gray-300 text-gray-900"
                    value={userInterest[user.name] || ""}
                    onChange={(e) =>
                      handleInputChange(e, user.name, "interest")
                    }
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-bold">
                  {AddFunc(
                    userSavings[user.name],
                    userLoan[user.name],
                    userMagalam[user.name],
                    userFine[user.name],
                    userInterest[user.name]
                  ) || "0"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="w-4 h-6 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-sm"
                    value={userAttendence[user.name] || ""}
                    onChange={(e) =>
                      handleInputChange(e, user.name, "attendence")
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <thead className="bg-gray-50 text-gray-600 font-medium border">
            <tr className="">
              <th className="py-3 px-4"></th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">
                {Info.reduce((acc, user) => {
                  return acc + (AddFunc(userSavings[user.name]) || 0);
                }, 0)}
              </th>
              <th className="py-3 px-4">
                {Info.reduce((acc, user) => {
                  return acc + (AddFunc(userLoan[user.name]) || 0);
                }, 0)}
              </th>
              <th className="py-3 px-4">
                {Info.reduce((acc, user) => {
                  return acc + (AddFunc(userMagalam[user.name]) || 0);
                }, 0)}
              </th>
              <th className="py-3 px-4">
                {Info.reduce((acc, user) => {
                  return acc + (AddFunc(userFine[user.name]) || 0);
                }, 0)}
              </th>
              <th className="py-3 px-4">
                {Info.reduce((acc, user) => {
                  return acc + (AddFunc(userInterest[user.name]) || 0);
                }, 0)}
              </th>
              <th className="py-3 px-4">Total collected</th>
              <th className="py-3 px-4 font-black">
                {Info.reduce((acc, user) => {
                  return (
                    acc +
                    (AddFunc(
                      userSavings[user.name],
                      userLoan[user.name],
                      userMagalam[user.name],
                      userInterest[user.name]
                    ) || 0)
                  );
                }, 0)}
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="flex justify-end"></div>
    </div>
  );
};

export default RegisterAdd;
