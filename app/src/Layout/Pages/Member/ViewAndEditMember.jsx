import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MemberSubNAv from '../../Components/NanoComponents/MemberSubNAv';
import moment from 'moment';
    


const ViewMembersEdit = () => {
    const Date = moment().format('L');
    let DeleteNAme;
    const navigate = useNavigate()

    const Data = window.FrontendAPI;
    const DataTo = window.BackendAPI;

    const [Datecheck, SetDate] = useState('');
    const [alert ,Setalert] = useState(false)
    const [Info, setInfo] = useState([]);
    const [confirm, Setconfirm] = useState(false);



    useEffect(() => {
      async function fetchData() {
        try {
          const data = await Data.MemberInfo();
          setInfo(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);



    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
  
    const handleDeleteClick = (id, name) => {
        const data = {
            "id" : id,
            "name" : name
        } ;
        DeleteNAme = name;
        
      setItemToDelete(data);
      setShowConfirmation(true);
    };
  
    const handleConfirmDelete = () => {
      console.log('Deleting item:', itemToDelete);
      navigate("/settings")
  

      DataTo.send('removemember', itemToDelete);
      setShowConfirmation(false);
    };


    const handleCancelDelete = () => {

        setItemToDelete(null);
        setShowConfirmation(false);
      };





  
    return (
        <div className="mx-auto px-4 md:px-6 mt-10">
        <div className="flex mb-8">
            <h1 className='font-bold text-4xl'>Member</h1>
        </div>
            <MemberSubNAv id="2"/>
            { showConfirmation ?(
           <div className="flex justify-center w-full ">
             <div role="alert" className="alert bg-white shadow-lg absolute w-1/3  mt-16 ">
                    <div className='w-full'>
                       <div className="border-b-2 w-full ">
                       <h3 className="font-bold">Delete confirmation message</h3>
                       </div>
                       <div className="flex gap-5 mt-5">
                       <button className="btn btn-sm w-full border-blue-500 bg-white text-blue-500" onClick={handleCancelDelete}>Cancel</button>
                        <button className="btn btn-sm w-full border-red-700 bg-white text-red-700" onClick={handleConfirmDelete}>Delete</button>
                       </div>
                    </div>
                   
              
            </div>
           </div>
           ):(<p></p>)}
        <div className="items-start justify-between mt-5 md:flex">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Team members
                </h3>
                <p className="text-gray-600 mt-2">
                    Effortlessly Manage Your Team Members with Our User-Friendly Platform
                </p>
            </div>
            <div className="mt-3 md:mt-0">
                <Link 
                    to="/members/add"
                    className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-sm hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                >
                    Add member
                </Link>
            </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-sm overflow-x-auto">
            <table className="w-full table-auto text-sm text-left bg-white">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">NO</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Total Savings</th>
                        <th className="py-3 px-6">Pending Savings</th>
                        <th className="py-3 px-6">Pending Magalam</th>
                        <th className="py-3 px-6">Fine</th>
                        <th className="py-3 px-6">Interest</th>
                        <th className="py-3 px-6">Loan Amount</th>
                        <th className="py-3 px-6"></th>

                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                {Info.map((e, index)=>(
                            <tr key={e.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                                <td className="px-6 py-4 whitespace-nowrap  font-bold uppercase">{e.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{e.totalsavings}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{e.pendingsavings}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{e.pendingmagalam}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{e.fine}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{e.interest}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{e.loan || 0}</td>
                                <td className="text-right px-6 whitespace-nowrap">
                                <Link to={`/members/edit/${e.id}`} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-sm"> 
                                        Edit
                                </Link>
                                    <button onClick={() => handleDeleteClick(e.id, e.name)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default ViewMembersEdit;
