import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoanSubNav from "../../Components/NanoComponents/LoanSubNav";
import Select from "react-select";
import AdditionalLoanSubNav from "../../Components/NanoComponents/AdditionalloanSubNav";
import { BankInfo } from "../../MainFunctions";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FineScreen = () => {
  const DataFrom = window.FrontendAPI;
  const backendapi = window.BackendAPI;

  const [updateTrigger, setupdateTrigger] = useState(true);
  const [name, Setname] = useState();
  const [memberdata, Setmemberdata] = useState([]);
  const [info, setInfo] = useState([]);
  const [limitStart, SetlimitStart] = useState(0);
  const [limitEnd, SetlimitEnd] = useState(14);
  const [bank, setbank] = useState("");
  const [loan, setloan] = useState();
  const [SelectName, setSelectName] = useState("");

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

  useEffect(() => {
    async function fetchData() {
      try {
        // const data = await DataFrom.getAdditionalloan();
        const info = await DataFrom.MemberInfo();
        setInfo(data);
        Setmemberdata(info);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [updateTrigger]);

  const data = [];
  if (name) {
    memberdata.map((e) => {
      if (name == e.name) {
        data.push(e);
      }
    });
  } else {
    data.push(...memberdata);
  }

  const Onsubmit = async () => {
    if (SelectName != "" && bank != "" && loan != "") {
      const id =
        memberdata.find((member) => member.name === SelectName)?.id || 0;
      const data = {
        name: SelectName,
        amount: loan,
        date: SortDate,
        bank: bank,
        id: id,
      };

      await backendapi.send("fine_payback", data);
      toast.success("Fine added successful.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSelectName("");
      setbank("");
      setloan("");
      setupdateTrigger(true ? false : true);
    }
  };

  return (
    <>
      {data && memberdata ? (
        <div className="mx-auto px-4 md:px-6 mt-10 pb-8">
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
            <h1 className="font-bold text-4xl">Fine Details</h1>
          </div>
          {/* <AdditionalLoanSubNav id="0" /> */}
          <div className="items-start justify-between mt-5 md:flex border-t-2 pt-7">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Fine alloction
              </h3>
              <p className="text-gray-600 mt-2">
                Seamlessly input your fine amount for allocating fines.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 ">
            <div className="col-span-full md:col-span-2">
              <label for="firstname" className="text-sm">
                Member name
              </label>
              <Select
                className="w-full mb-5"
                options={memberdata.map((e) => ({
                  label: e.name,
                  value: e.name,
                }))}
                onChange={(e) => setSelectName(e.value)}
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
                value={loan}
                onChange={(e) => setloan(e.target.value)}
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
                onClick={Onsubmit}
                className=" px-6 ml-auto  mr-6 w-48 h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
          <div className="items-start justify-between mt-5 md:flex mt-7">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Fine record
              </h3>
              <p className="text-gray-600 mt-2">
                Keep track of all your fines in one centralized hub.
              </p>
            </div>
            <div className="mt-3 md:mt-0 w-56   ">
              <label for="firstname" className="text-sm">
                Member name
              </label>
              <Select
                className="w-full mb-5"
                options={memberdata.map((e) => ({
                  label: e.name,
                  value: e.name,
                }))}
                onChange={(e) => Setname(e.value)}
              />
            </div>
          </div>
          <div className="mt-7 shadow-sm border rounded-sm overflow-x-auto ">
            <table className="w-full table-auto text-sm text-left bg-white">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">NO</th>
                  <th className="py-3 px-6">Name</th>
                  {/* <th className="py-3 px-6">Date</th> */}
                  <th className="py-3 px-6">Pending Fine Amount</th>

                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {data.map((e, index) => (
                  <tr key={e.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">
                      {e.name}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">{e.date}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap">{e.fine}</td>

                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        to={`/fine/${e.name}/${e.id}`}
                        className="py-2 px-3 font-medium text-green-400 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>loanding</p>
      )}
    </>
  );
};

export default FineScreen;
