import React, { useEffect, useState } from 'react';
import { Fetching } from '../../MainFunctions';
import { useNavigate } from 'react-router-dom';

const Addmetadata = () => {
    const api = window.BackendAPI
    const navigate = useNavigate()

    const [metadata, SetMetadata] = useState("");
    const fetchdata = Fetching("meta")
    const renderData = fetchdata[0] || 0;



    const [savings, Setsavings] = useState();
    const [magalam , Setmagalam] = useState();
    const update =()=>{
        const data ={
            savings : savings || renderData.savingsincrement,
            magalam : magalam || renderData.magalamincrement
        }
        api.send("editmetadata", data)
        navigate("/settings")
        
    }



    return (
        <div className="mx-auto px-4 md:px-6 mt-10">
      <div className="flex mb-8">
          <h1 className='font-bold text-4xl'>Meta Data info</h1>
      </div>
          {/* <RegisterSubNav id="0"/> */}
        <div className="items-start justify-between mt-8 lg:flex">
            </div>
            <div className="max-w-lg">
            </div>
            <div className="grid grid-cols-5">
            <div className="col-span-full sm:col-span-2 grid grid-cols-3">

                        <div className="col-span-full">
                            <label for="lastname" className="text-sm">Savings Increment</label>
                            <input id="lastname" type="number" placeholder={renderData.savingsincrement} className="w-full rounded-md  border-gray-300 text-gray-900" 
                            value={savings}
                            onChange={(e)=> Setsavings(e.target.value)}
                            required/>
                        </div>
                        <div className="col-span-full ">
                            <label for="lastname" className="text-sm">Magalam Increment</label>
                            <input id="lastname" type="number" placeholder={renderData.magalamincrement} className="w-full rounded-md  border-gray-300 text-gray-900" 
                            value={magalam}
                            onChange={(e)=> Setmagalam(e.target.value)}
                            required/>
                        </div>
                        <button
                        className="px-6 ml-auto col-span-3 mt-6 w-48 h-10 text-white bg-green-600 rounded-md duration-150 hover:bg-green-300 active:shadow-lg   "
                        onClick={update}>UPDATE
                        </button>

            </div>
            </div>
        </div>

    );
}

export default Addmetadata;
