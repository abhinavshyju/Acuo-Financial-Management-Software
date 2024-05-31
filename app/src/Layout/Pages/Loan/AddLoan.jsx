import { months } from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import LoanSubNav from '../../Components/NanoComponents/LoanSubNav';
import WarnningNotification from '../../Components/NanoComponents/WarnningNotification';
import { BankInfo } from '../../MainFunctions';

const AddLoan = () => {

    const DataFrom = window.FrontendAPI;
    const DataTo = window.BackendAPI;

    const navigate = useNavigate();
    const [alert, Setalert] = useState(false); 
    const [id , Setid] = useState();
    const [LoanAmount, SetLoanAmount] = useState();
    const [interestRate, SetRate] = useState();
    const [Months, SetMonths] = useState();
    const [Bank, SetBank] = useState();

    const [Info, setInfo] = useState([]);
    
    const bankInfo = BankInfo();
    console.log(bankInfo)
  
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await DataFrom.MemberInfo();
          setInfo(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);
const MemberInfo = Info.find(e => e.id == id);
// console.log(MemberInfo)
const findInterest = (LoanAmount,interestRate,Months)=>{
    const total = LoanAmount * (interestRate/100)/12 * Months || 0;
    return total;

}
const findInterestTotal = (LoanAmount,interestRate,Months)=>{
    const total =Number(LoanAmount)+ Number(LoanAmount * (interestRate/100)/12 * Months) || 0;
    return total;

}
  const submit =(event)=>{
    event.preventDefault();
    


    if (id) {
    const loan_total = Number( LoanAmount)+ Number(LoanAmount * (interestRate/100)/12 * Months)
    const data = {
      loan :loan_total,
      id : id,
      name : MemberInfo.name,
      loanamount : LoanAmount,
      bank : Bank
    }
      window.BackendAPI.send('add-loan',data);

      navigate('/loan')

    } else {
      console.log("error");
      Setalert(true);
      setTimeout(() => {
        Setalert(false);
      }, 5000);
      
    }
   
    // console.log(data)

  }
    return (
      <div className="mx-auto px-4 md:px-6 mt-10">
      <div className="flex mb-8">
          <h1 className='font-bold text-4xl'>Loan</h1>
      </div>
            <LoanSubNav id="1"/>
            {(alert) ? (
            <div className="w-full left-0 m-0 absolute bottom-3">
            <WarnningNotification message="Please select the name of the member"/>
            </div>
          ):(
            <p></p>
          )}
            <form onSubmit={submit}className="container flex flex-col mx-auto space-y-12 mt-10 border shadow-md rounded-md pb-5">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-white">
                      <div className="col-span-full">
                        <div className="text-2xl font-bold">Add New Loan</div>
                      </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full">
                        <div className="col-span-full md:col-span-3">
                            <label for="firstname" className="text-sm">Name</label>
                            <Select
                                className='mb-1'
                                options={Info.map(e => ({ label: e.name, value: e.id }))}
                                onChange={(e)=> Setid(e.value || false)}
                            />
                        </div>
                        <div className="col-span-full md:col-span-3">
                                  <label for="firstname" className="text-sm">Bank Name</label>
                                  <Select className='flex-1 lg:flex-none rounded-md  border-gray-300 text-gray-900 w-52 '
                                  options={bankInfo ? bankInfo.map(e => ({ label: e.bankname, value: e.bankname || false})):"Nothing"}
                                  onChange={(e)=> SetBank(e.value)}
                                  required
                                />
                          </div>
                        {/* <div className="md:col-span-3 "></div> */}
                        <div className="col-span-full md:col-span-3">
                            <label for="lastname" className="text-sm">Principal Amount </label>
                            <input id="lastname" type="number" placeholder="Amount" className="w-full rounded-md  border-gray-300 text-gray-900" 
                            value={LoanAmount}
                            onChange={(e)=> SetLoanAmount(e.target.value || false || false)}           
                            required/>
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label for="email" className="text-sm">Annual Interest rate</label>
                            <input placeholder="Annual rate" className="w-full rounded-md  border-gray-300 text-gray-900" 
                            type="number"
                            value={interestRate}
                            onChange={(e)=> SetRate(e.target.value || false)}
                            required
                            />
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label for="address" className="text-sm">Period</label>
                            <input id="address" placeholder="Period(Months)" className="w-full rounded-md  border-gray-300 text-gray-900" 
                            type="number"
                            value={Months}
                            onChange={(e)=> SetMonths(e.target.value || false)}           
                            required/>
                        </div>
                        <div className=" md:col-span-4"></div>
                        <div className="col-span-full md:col-span-2">
                        <label for="address" className="text-sm">Interest Earned</label>
                        <div className="flex items-center px-2 w-full rounded-md border h-10 border-gray-300 text-gray-900">
                          {findInterest(LoanAmount,interestRate,Months)}
                        </div>
                        </div>
                        <div className="col-span-full md:col-span-2 ">
                        <label for="address" className="text-sm">Principal Amount</label>
                          <div className="flex items-center px-2 w-full rounded-md border h-10 border-gray-300 text-gray-900">
                            {LoanAmount || 0}
                          </div>
                       
                        </div>
                        <div className="col-span-full md:col-span-2 ">
                        <label for="address" className="text-sm">Total Value</label>
                          <div className="flex items-center px-2 w-full rounded-md border h-10 border-gray-300 text-gray-900">
                            {findInterestTotal(LoanAmount,interestRate,Months)}
                          </div>
                       
                        </div>
                    </div>
                </fieldset>
                <button
                className="px-6 ml-auto  mr-6 w-48 h-10 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg   "
                type="submit">Save
                </button>
            </form>

           
        </div>
         
    );
}

export default AddLoan;
