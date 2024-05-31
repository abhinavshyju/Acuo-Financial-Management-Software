import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExpenseNAv from '../../Components/NanoComponents/ExpenseandIncomeSubNAv';
import Select from 'react-select';
import { BankInfo } from '../../MainFunctions';

const ExtraIncome = () => {
    const backendapi = window.BackendAPI;
    const frontendapi = window.FrontendAPI;
    const Date = moment().format('L');
    const BankName = BankInfo()
    const [bank,setbank]=useState('');
    const [limitStart, SetlimitStart] = useState(0);
    const [limitEnd, SetlimitEnd] = useState(14);


    const [AddExpense, SetAddExpense] = useState('');
    const [name, Setname] = useState('');
    const [expense, Setexpense] = useState('');

    useEffect(() => {
       async function FetchData(){
        const data = await frontendapi.extraIncome();
        Setexpense(data)
       }
       FetchData();
    }, []);
    
    
    const submit = (e)=>{
        e.preventDefault();

        const data = {
            date : Date,
            name : name,
            amount : AddExpense,
            bank:bank
        }
        // console.log(data)
        if (name && AddExpense && bank !='') {
            backendapi.send("ExtraIncome",data)
        }
    }
    let total = 0 ;

    const DeleteFun = (id)=>{
        const data = {id:id}
        backendapi.send("ExtraDelete",data)

    }
    useEffect(() => {
        async function FetchData(){
         const data = await frontendapi.extraIncome();
         Setexpense(data)
        }
        FetchData();
     }, [submit]);
    return (
     <>
       {expense ? (
       <div className="mx-auto px-4 md:px-6 mt-10">
       <div className="flex mb-8">
           <h1 className='font-bold text-4xl'>Expenses & Income</h1>
       </div>
        <ExpenseNAv id="2"/>
    <div className="items-start justify-between mt-5 md:flex">
        <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Add Additional Income
            </h3>
            <p className="text-gray-600 mt-2">
            Effortlessly record new income entries for accurate financial tracking.
            </p>
        </div>
    </div>
    <div className="grid grid-cols-6 gap-4 mt-5 ">
    <div className="col-span-full md:col-span-2">
                            <label for="firstname" className="text-sm">Income Details</label>
                            <input id="firstname" type="text" placeholder="Details" className="w-full rounded-md  border-gray-300 text-gray-900" 
                             value={name}
                             onChange={(e)=> Setname(e.target.value)}
                             required/>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label for="lastname" className="text-sm">Amount</label>
                            <input id="lastname" type="number" placeholder="Amount" className="w-full rounded-md  border-gray-300 text-gray-900" 
                            value={AddExpense}
                            onChange={(e)=> SetAddExpense(e.target.value)}
                            required/>
                        </div>
                        <div className="col-span-full md:col-span-2">
                                  <label for="firstname" className="text-sm">Bank Name</label>
                                  <Select className='flex-1 lg:flex-none rounded-md  border-gray-300 text-gray-900 w-52 '
                                  options={BankName ? BankName.map(e => ({ label: e.bankname, value: e.bankname || false})):"Nothing"}
                                  onChange={(e)=> setbank(e.value)}
                                  required
                                />
                          </div>
                        <div className="col-span-full md:col-span-1 flex items-end">
                        <button
                        onClick={submit}
                            className="px-6 ml-auto  mr-6 w-48 h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
                            >Save
                        </button>
                    </div>
    </div>
    <div className="grid  grid-cols-4">
            <div className="max-w-lg mt-8 col-span-3">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl ">
                Additional Income Overview
                </h3>
                <p className="text-gray-600 mt-2">
                A comprehensive look at all your income sources in one place.
                </p>
            </div>
            <div className="col-span-1 flex justify-center items-end ">
                <h1 className='font-bold text-xl'>Total Amount : {total}</h1>
            </div>
    </div>
    <div className="mt-5 shadow-sm border rounded-sm overflow-x-auto ">
        <table className="w-full table-auto text-sm text-left bg-white">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                    <th className="py-3 px-6">NO</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Purpose</th>
                    <th className="py-3 px-6">Amount</th>
                    {/* <th></th> */}

                </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
        {[...expense].reverse().slice(limitStart,limitEnd+1).map((e, index) => (
            <tr key={e.id}>
            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap font-bold uppercase">{e.date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{e.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{e.ammount}</td>
            {/* <td className="px-6 whitespace-nowrap leading-none  font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-sm"><button onClick={()=>DeleteFun(e.id)}>Delete</button></td> */}
            </tr>
        ))}
        </tbody>
        </table>
    </div>
    <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex justify-center mt-4 mb-6">
	<span className="block"> {limitStart +1} to {limitEnd+1}</span>
	<div className="space-x-1">
		<button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
         onClick={()=>{ if(limitStart == 0){

         }else{
            SetlimitStart(limitStart-15) ;SetlimitEnd(limitEnd - 15)
         }}}>
			<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>
		<button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
         onClick={()=> {SetlimitStart(limitStart+15); SetlimitEnd(limitEnd + 15)}}>
			<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
	    </div>
        </div>
    
</div>
       ):(
        <p></p>
       )}
     </>
    );
}

export default  ExtraIncome;
