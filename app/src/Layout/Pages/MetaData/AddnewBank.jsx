import React, { useState } from 'react';
import { useEffect } from 'react';
import { BankInfo, Fetching } from '../../MainFunctions';
import { useNavigate } from 'react-router-dom';

const AddnewBank = () => {
    const [id , setId] =useState();
    const [name ,setName] = useState();
    const [accno , Setaccno] = useState();
    const [ ifsc, Setifsc]= useState();
    const Bank = BankInfo()
    let Bank_details = Fetching("bank")
    const navigate = useNavigate()
    
    // console.log(Bank)


    const api = window.BackendAPI;

    const [verify, Setverify] = useState(false);


    const submit =()=>{
        if (name && accno && ifsc){


            const data = {
                bankname : name,
                accountnumber : accno ,
                ifsccode : ifsc
            }
            api.send("AddBank",data)
            navigate("/settings")
            
        }
    }
const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
  
    const handleDeleteClick = (id,) => {
        
        
      setItemToDelete(id);
      setShowConfirmation(true);
    };
  
    const handleConfirmDelete = () => {
      console.log('Deleting item:', itemToDelete);

  

      api.send("deleteBank",itemToDelete)
      navigate("/settings")
      setShowConfirmation(false);
    };


    const handleCancelDelete = () => {

        setItemToDelete(null);
        setShowConfirmation(false);
      };



    const remove =(id)=>{
        api.send("deleteBank",id)
    }

    return (
            <div className="mx-auto px-4 md:px-6 mt-10">
      <div className="flex mb-8">
          <h1 className='font-bold text-4xl'>Bank info</h1>
      </div>
          {/* <RegisterSubNav id="0"/> */}
        <div className="items-start justify-between mt-8 lg:flex">
            <div className="max-w-lg">
            <h3 className="text-neutral-900 text-xl font-bold sm:text-2xl">
              Bank Details
            </h3>
            </div>
           
        </div>
        {showConfirmation ?(
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
        ):(  <p></p> )}
<div className="grid grid-cols-4  gap-3">


            <div className="col-span-3 py-8">
            <div className="addbank w-full grid grid-cols-6 gap-6  mb-6">
            <div className="col-span-full sm:col-span-2">
                <label for="email" className="text-sm">Bank name</label>
                <input id="email" type="text" placeholder="Name" className="w-full rounded-md  border-gray-300 text-gray-900" 
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="col-span-full sm:col-span-2">
                <label for="email" className="text-sm">Account number</label>
                <input id="email" type="text" placeholder="Account number" className="w-full rounded-md  border-gray-300 text-gray-900" 
                value={accno}
                onChange={e => Setaccno(e.target.value)}
                />
            </div>
            <div className="col-span-full sm:col-span-2">
                <label for="email" className="text-sm">IFSC Code</label>
                <input id="email" type="text" placeholder="IFSC" className="w-full rounded-md  border-gray-300 text-gray-900" 
                value={ifsc}
                onChange={e=> Setifsc(e.target.value)}
                />
            </div>
            <div className="col-span-5"></div>
            <button
                className="px-6  col-span-1  h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg   "
                onClick={submit}
                >Save
                </button>
            </div>
        <div className="mt-2 shadow-sm border rounded-sm overflow-x-auto ">
            <table className="w-full table-auto text-sm text-left bg-white">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr className=''>
                        <th className="py-3 px-4">NO</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Account Number</th>
                        <th className="py-3 px-4">IFSC Code</th>
                        <th className="py-3 px-4">Balance</th>
                        <th className="py-3 px-4"></th>

                        
                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">

                { Bank ? (
                Bank.map((user,index) => (
                    <tr key={user.id} className=''>
                        <td className="px-4 py-3 whitespace-nowrap">{index+1}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-bold">{user.bankname}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-bold">{user.accountnumber}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-bold">{user.ifdccode}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-bold">{user.balance}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-red-500"><button onClick={()=> handleDeleteClick(user.id)}>Delete</button></td>

                        </tr>))
                ) : (<p></p>)}
                       
                </tbody>
            </table>
            </div>
            </div>
            <div className=" col-span-full lg:col-span-1  shadow-sm rounded px-5 py-6 ">
                    <h1 className='text-2xl font-bold'>Activities</h1>
                    <div className="flex flex-col gap-3 mt-4 text-sm">
                        {Bank_details ? (
                            Bank_details.slice(-5).map((e) => (
                            <div className="bg-[#FAFAFBFF] w-full px-4 py-3 rounded-lg" key={e.id}>
                                <h1 className=' font-semibold'> On {e.date},</h1>
                                <h1>
                                <span className=''>{e.name}</span> made a <span className='font-semibold underline'>{e.ammount}</span> deposit to <br/><span className='font-semibold underline'>{e.bank}</span>
                                </h1>
                            </div>
                            ))
                        ) : (
                            <p>No bank details available.</p>
                        )}
                    </div>

                </div> 
        </div>
     
        
        </div>
    );
}

export default AddnewBank;
