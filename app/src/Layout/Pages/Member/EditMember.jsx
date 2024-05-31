import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditMember = () => {
    const { id } = useParams();


    const Datafrom = window.FrontendAPI;
    const DataTo = window.BackendAPI;

    const [Info, setInfo] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await Datafrom.MemberInfo();
          setInfo(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);
    console.log(Info)
    const [userSavings, setUserSavings] = useState('');
    const [userLoan, setUserLoan] = useState('');
    const [userMagalam, setUserMagalam] = useState('');
    const [userFine, setUserFine] = useState('');
    const [userInterest, setUserInterest]= useState('');
    const [userpendingsavings, setuserpendingsavings] = useState('')

    const Onedata = Info.find(e => e.id == id);
    console.log(Onedata)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(Onedata){
         const allData = {
           username : Onedata.username,
           id : Onedata.id,
           savings :  userSavings || Onedata.totalsavings,
           loan : userLoan || Onedata.loan,
           magalam : userMagalam || Onedata.pendingmagalam,
           fine : userFine || Onedata.fine,
           interest : userInterest || Onedata.interest,
           pendingsavings : userpendingsavings || Onedata.pendingsavings
         }
         DataTo.send('editall',allData)
        //  navigate("/viewdata")
        }else{
          console.log("error")
        }
    }

    const submenuNav = [
      { title: "View", path: "/members" },
      { title: "Edit Member", path: "/home" },
  ]
  console.log(Onedata)
    return (
      <div className="mx-auto px-4 md:px-6 mt-10">
      <div className="flex mb-8">
          <h1 className='font-bold text-4xl'>Member</h1>
      </div>
                        <nav className="border-b">
                            <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
                                {
                                    submenuNav.map((item,idx) => {
                                        return (
                                            // Replace [idx == 0] with [window.location.pathname == item.path]
                                            <li key={idx} className={`py-1 ${idx == 1 ? "border-b-2 border-indigo-600" : ""}`}>
                                                <Link to={item.path} className="block py-2 px-3 rounded-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150">
                                                    {item.title}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                    {/* </header> */}
        {Onedata ? (
        <form onSubmit={handleFormSubmit} className="container flex flex-col mx-auto space-y-12 mt-5 border  rounded-md shadow-sm bg-white">
            <fieldset className="grid grid-cols-4 gap-6 p-6 ">
                <div className="col-span-full lg:col-span-1">
                    <p className="font-bold text-xl">Edit Personal Inormation</p>
                    <p className='text-black font-bold mt-10'>Name : {Onedata.name}</p>
                    <p className="font-bold mt-3">Phone number : {Onedata.phoneNumber} </p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                        <label for="lastname" className="text-sm">Collected Savings</label>
                        <input id="lastname" type="number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                         value={userSavings || ''}
                         placeholder={Onedata.totalsavings}
                         onChange={(e) => setUserSavings(e.target.value)}
                       />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label for="email" className="text-sm">Pending Loan</label>
                        <input id="email" type="number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                         value={userLoan || ''}
                         placeholder={Onedata.loan}
                         onChange={(e) => setUserLoan(e.target.value)}/>
                    </div>
                    <div className="col-span-full">
                        <label for="address" className="text-sm">Pending Magalam</label>
                        <input id="address" type="number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                        value={userMagalam || ''}
                        placeholder={Onedata.pendingmagalam}
                        onChange={(e) => setUserMagalam(e.target.value)}/>
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label for="city" className="text-sm">Pending savings</label>
                        <input id="city" type="number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                      value={userpendingsavings || ''}
                      placeholder={Onedata.pendingsavings}
                      onChange={(e) => setuserpendingsavings(e.target.value)}
                      />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label for="state" className="text-sm">Fine</label>
                        <input id="state" type="number"  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" 
                          value={userFine || ''}
                          placeholder={Onedata.fine}
                          onChange={(e) => setUserFine(e.target.value)}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label for="zip" className="text-sm">Interest</label>
                        <input id="zip" type="number" className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" 
                        value={userInterest || ''}
                        placeholder={Onedata.interest}
                        onChange={(e) => setUserInterest(e.target.value)}
                      />
                    </div>
                </div>
                <button
            className="px-6   mr-1 w-48 h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg  "
            type="submit">Save
            </button>
            </fieldset>
          
        </form>
        ):(
            <div className="w-full flex justify-center mt-10 ">
                <span className="loading loading-spinner loading-lg  "></span>
            </div>
        )}
    </div>
    );
}

export default EditMember;
