import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RegisterEdit = () => {
    const { id } = useParams();
  const navigate = useNavigate();

  const DataFrom = window.FrontendAPI;
  const DataTo = window.BackendAPI;

  const [logData, setLogData] = useState([]);
  const [userSavings, setUserSavings] = useState('');
  const [userLoan, setUserLoan] = useState('');
  const [userMagalam, setUserMagalam] = useState('');
  const [userFine, setUserFine] = useState('');
  const [userInterest, setUserInterest]= useState('');
  const [userGave , setUserGave] = useState('');
  const [userAttendence, setUserAttendence] = useState('');





  useEffect(() => {
    async function fetchData() {
      try {
        const data = await DataFrom.LogData();
        setLogData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const Onedata = logData.find(e => e.id == id);
  const AddFunc =(save,loa,maga,fin,inter)=>{
    const saving = parseInt(save) || 0;
    const loan = parseInt(loa) || 0;
    const magalam = parseInt(maga) || 0;
    const fine = parseInt(fin) || 0;
    const interest = parseInt(inter)|| 0;
  
    const Sum = saving + loan + magalam + fine + interest;
    return Sum
  } 

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(Onedata){
     const allData = {
       username : Onedata.username,
       id : Onedata.id,
       savings :  userSavings || Onedata.savings,
       oldsavings : Onedata.savings || 0,
       loan : userLoan || Onedata.loan,
       oldloan : Onedata.loan || 0,
       magalam : userMagalam || Onedata.magalam,
       oldmagalam : Onedata.magalam || 0,
       fine : userFine || Onedata.fine,
       oldFine : Onedata.fine ||0 ,
       interest : userInterest || Onedata.interest,
       oldInterest : Onedata.interest || 0,
       gave : userGave || Onedata.gave,
       total :  AddFunc((userSavings || Onedata.savings), (userLoan || Onedata.loan), (userMagalam || Onedata.magalam),(userFine || Onedata.fine), (userInterest || Onedata.interest))|| "0",
       attendence :  Onedata.attendence,
       date :Onedata.date
     }
     DataTo.send('LogParam',allData)
     navigate("/home")
    }else{
      console.log("error")
    }
}
const submenuNav = [
    {title:"Add", path:"/log/add"},
    { title: "View", path: "/log" },
    { title: "Edit Member", path: "/home" },
]

console.log(Onedata)

  return (
    <div className="mx-auto px-4 md:px-6 mt-10">
      <div className="flex mb-8">
          <h1 className='font-bold text-4xl'>Accounts</h1>
      </div>
          <header className="text-base lg:text-sm">
                        <nav className="border-b">
                            <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
                                {
                                    submenuNav.map((item,idx) => {
                                        return (
                                            // Replace [idx == 0] with [window.location.pathname == item.path]
                                            <li key={idx} className={`py-1 ${idx == 2? "border-b-2 border-indigo-600" : ""}`}>
                                                <Link to={item.path} className="block py-2 px-3 rounded-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150">
                                                    {item.title}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                    </header>
        {Onedata ? (
        <form onSubmit={handleFormSubmit} className="container flex flex-col mx-auto space-y-12 mt-10 border  rounded-md shadow-sm pb-10">
            <fieldset className="grid grid-cols-4 gap-6 p-6">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-bold text-2xl mb-10">Personal Inormation</p>
                    <p className='font-semibold text-neutral-600 text-lg'>Name :  {Onedata.username}</p>
                    <p className='font-semibold text-neutral-600 text-lg'>Date :  {Onedata.date}</p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                        <label for="lastname" className="text-sm">Savings</label>
                        <input id="lastname" type="number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                          value={userSavings || ''}
                          placeholder={Onedata.savings}
                          onChange={(e) => setUserSavings(e.target.value)}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label for="email" className="text-sm">Loan</label>
                        <input id="email" type="number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                          value={userLoan || ''}
                          placeholder={Onedata.loan}
                          onChange={(e) => setUserLoan(e.target.value)}
                        />
                    </div>
                    <div className="col-span-full">
                        <label for="address" className="text-sm"> Magalam</label>
                        <input id="address" type="number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                        value={userMagalam || ''}
                        placeholder={Onedata.magalam}
                        onChange={(e) => setUserMagalam(e.target.value)}
                      />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label for="city" className="text-sm">Fine</label>
                        <input id="city" type="number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                        value={userFine || ''}
                        placeholder={Onedata.fine}
                        onChange={(e) => setUserFine(e.target.value)}
                    />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label for="state" className="text-sm">Interest</label>
                        <input id="state" type="number"  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900" 
                          value={userInterest || ''}
                          placeholder={Onedata.interest}
                          onChange={(e) => setUserInterest(e.target.value)}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-2 flex justify-center items-center font-bold px-10 border h-10 mt-6 w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900">
                        <h1> Total :  </h1>
                        <span className='overflow-hidden'>{AddFunc((userSavings || Onedata.savings), (userLoan || Onedata.loan), (userMagalam || Onedata.magalam),(userFine || Onedata.fine), (userInterest || Onedata.interest))|| "0"}</span>
                    </div>
                </div>
            </fieldset>
            <button
            className="  px-6 ml-auto  mr-6 w-48 h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
            type="submit">Save
            </button>
        </form>
        ):(
            <div className="w-full flex justify-center mt-10 ">
                <span className="loading loading-spinner loading-lg  "></span>
            </div>
        )}
    </div>
  );
};


export default RegisterEdit;
