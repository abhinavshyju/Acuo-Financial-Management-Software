import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import MemberSubNAv from "../../Components/NanoComponents/MemberSubNAv";
import { ToastContainer, toast } from "react-toastify";

const AddMember = () => {
  const Date = moment().format("L");
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [address, SetAddress] = useState("");
  const [success, Setsuccess] = useState(false);

  const Submit = async (e) => {
    e.preventDefault();
    const newMember = {
      name: name,
      phone: phoneno,
      address: address,
      date: Date,
    };

    try {
      await window.BackendAPI.send("newMember", newMember);

      toast.success("New member added successfully.", {
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
        navigate("/members");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto px-4 md:px-6 mt-10">
      <ToastContainer
        position="top-right"
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
        <h1 className="font-bold text-4xl">Member</h1>
      </div>
      <MemberSubNAv id="1" />
      <form
        onSubmit={Submit}
        className="container flex flex-col mx-auto space-y-12 mt-10 rounded-md shadow-sm bg-white border pb-5  "
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 ">
          <div className="space-y-2 col-span-full ">
            <p className="font-bold text-2xl">Add New Member</p>
            <p className="text-neutral-600">
              Welcome New Members – Add Them Here
            </p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full ">
            <div className="col-span-full sm:col-span-3">
              <label for="firstname" className="text-sm">
                Name
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Name"
                className="w-full rounded-md  border-gray-300 text-gray-900"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label for="lastname" className="text-sm">
                Phone number
              </label>
              <input
                id="lastname"
                type="number"
                placeholder="Phone number"
                className="w-full rounded-md  border-gray-300 text-gray-900"
                value={phoneno}
                onChange={(e) => setphoneno(e.target.value)}
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label for="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-md  border-gray-300 text-gray-900"
              />
            </div>
            <div className="col-span-full">
              <label for="address" className="text-sm">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder=""
                className="w-full rounded-md  border-gray-300 text-gray-900"
                value={address}
                onChange={(e) => SetAddress(e.target.value)}
                required
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label for="city" className="text-sm">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder=""
                className="w-full rounded-md  border-gray-300 text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label for="state" className="text-sm">
                State / Province
              </label>
              <input
                id="state"
                type="text"
                placeholder=""
                className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label for="zip" className="text-sm">
                ZIP / Postal
              </label>
              <input
                id="zip"
                type="text"
                placeholder=""
                className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
              />
            </div>
          </div>
        </fieldset>
        <button
          className="px-6 ml-auto  mr-6 w-48 h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg   "
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddMember;
