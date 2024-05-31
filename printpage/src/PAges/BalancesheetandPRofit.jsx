import { useEffect, useState } from 'react';
import Test from './Test';

function BalancesheetandPRofit() {
    const apiCall = window.FrontendAPI;
    const [data,SetData]= useState();
  
    useEffect(() => {
      async function fetch(){
        const data = await apiCall.gettemp();
        SetData(data)
      }
      fetch()
    }, []);
    console.log(data)
    let s=0
    if (data && data.length > 0) {
      const jsonString = data[0].text;
    
      try {
         SetData(JSON.parse(jsonString));
      } catch (error) {
        console.error('Error parsing JSON:', error.message);
      }
    } else {
      console.error('Data is empty or undefined.');
    }
    console.log(data)
  return (
    <div className="">
    {data ? (
     <div className=''>
     
     <div className="">
     
      
      <div className="min:h-screen mt-4 mb-4 px-2 py-4">
      <Test/>
      <div className="text-center  text-2xl font-bold underline  underline-offset-8 mb-10 ">
        Balance Sheet
      </div>
      <div className=" grid grid-cols-2 ">
        <div className="col-span-full grid grid-cols-4 px-2 gap-3  py-4 pb-4">
          <div className="col-span-full border-b-2">
            <h1 className='font-bold ml-3 text-xl'>Income</h1>
          </div>
          <div className="col-span-3  font-semibold bg-gray-50 px-1 py-0.5 rounded">
            Total assets
          </div>
          <div className="col-span-1 text-right">
            {data.total_assets}
          </div>
          <div className="col-span-3   font-semibold flex flex-col">
            <span className='bg-gray-50 px-1 py-0.5 rounded'>Other Income</span>
              {data.other_income ? data.other_income.map(e=>(
                <span className='ml-2 font-medium flex justify-between' > <span>{e.name}</span><span className='font-light'>{e.ammount}</span></span>
              )):(<p></p>)}
              
          </div>
          <div className="col-span-1 text-right">
          {data.other_income ? data.other_income.reduce((t,e)=> t + Number(e.ammount),0) : (<p></p>)}
          </div>
          <div className="col-span-3  bg-gray-50 px-1 py-0.5 rounded font-semibold">
            Bank Interest
          </div>
          <div className="col-span-1 text-right">
            {data.bankinterest || 0}
          </div>
          <div className="col-span-3  bg-gray-50 px-1 py-0.5 rounded font-semibold">
            Interest
          </div>
          <div className="col-span-1 text-right">
            {data.interest || 0}
          </div>
          <div className="col-span-3  bg-gray-50 px-1 py-0.5 rounded font-semibold">
            Fine
          </div>
          <div className="col-span-1 text-right">
            {data.fine || 0}
          </div>
          <div className="col-span-3  bg-gray-50 px-1 py-0.5 rounded font-semibold">
            Magalam
          </div>
          <div className="col-span-1 text-right">
            {data.magalam}
          </div>
          <div className="col-span-3  bg-gray-50 px-1 py-0.5 rounded font-semibold">
            Previous Profit
          </div>
          <div className="col-span-1 text-right">
            {data.prev_profit}
          </div>
          {data.extra_income ? data.extra_income.map(e=>(
              <><div className="col-span-3  bg-gray-50 px-1 py-0.5 rounded font-semibold">
                {e.name}
            </div>
            <div className="col-span-1 text-right">
              {e.ammount}
            </div>
              </>
          )):(<p></p>) }
          <div className="col-span-3 "></div>
          <div className="col-span-1  py-4 text-black font-bold text-base text-right "><span className=' border-spacing-1 underline underline-offset-2 border-black '>{data.total_income_side }</span></div>
          
        </div>
        




        <div className="col-span-full grid grid-cols-4 gap-3 pb-4 ">
          <div className="col-span-full border-b-2">
            <h1 className='font-bold ml-3 text-xl'>Expense</h1>
          </div>
          <div className="col-span-3  flex items-center font-semibold bg-gray-50 px-1 py-0.5 rounded">
            Loan Amount
          </div>
          <div className="col-span-1 text-right">
            {data.loan_amount}
          </div>
          <div className="col-span-3   justify-center  font-semibold flex flex-col">
            
          <span className='bg-gray-50 px-1 py-0.5 rounded'>Other Expence</span>
              {data.other_expense ? data.other_expense.map((e)=>(
                <span className='ml-2 font-medium flex justify-between' > <span>{e.name}</span><span className='font-light'>{e.ammount}</span></span>
              )):(<p></p>)}
          </div>
          <div className="col-span-1 text-right">
          {data.other_expense ? data.other_expense.reduce((t,e)=> t+ Number(e.ammount),0):(<p></p>)}
          </div>
          <div className="col-span-3  flex items-center bg-gray-50 px-1 py-0.5 rounded font-semibold">
            Balance
          </div>
          <div className="col-span-1 text-right">
           {data.balance}
          </div>
          <div className="col-span-3 "></div>
          <div className="col-span-1  py-4 text-black font-bold text-base text-right "><span className='border-spacing-1 underline
          underline-offset-2 border-black '>{data.total_expense_side}</span></div>

        </div>
        

      </div>
      </div>
      <div class="pagebreak"> </div>
        <div className="min:h-screen my-4   px-2 py-4">
          {/* <Test/> */}
          <div className="text-center  text-2xl font-bold underline  underline-offset-8 mb-10">
            Profit and Loss
          </div>
          <div className="grid grid-cols-5  gap-3 px-3">
              <div className="font-bold col-span-full  text-xl">
                Liability
              </div>
              <div className="col-span-4 flex items-center bg-gray-50 px-1 py-0.5 rounded font-semibold">
                    Total Assets
              </div> 
              <div className="col-span-1  text-right">
                    {data.total_assets }
              </div>  
              {data.extra_income ? data.extra_income.map((e)=>(
                    <>
                    <div className="col-span-4 flex items-center bg-gray-50 px-1 py-0.5 rounded font-semibold">
                    {e.name}
                    </div> 
                    <div className="col-span-1  text-right">
                        {e.ammount}
                    </div>  
                    </>
              )): ""}
              
              <div className="col-span-4 flex items-center bg-gray-50 px-1 py-0.5 rounded font-semibold">
                    Total
              </div> 
              <div className="col-span-1  font-semibold text-right ">
                    {data.liability_total}
              </div>  


              <div className="font-bold col-span-full  text-xl">
                Assets
              </div>
              <div className="col-span-4 flex items-center bg-gray-50 px-1 py-0.5 rounded font-semibold">
                    Loan amount
              </div> 
              <div className="col-span-1  text-right">
                    {data.loan_amount}
              </div>  
              <div className="col-span-4 flex items-center bg-gray-50 px-1 py-0.5 rounded font-semibold">
                    Balance
              </div> 
              <div className="col-span-1  text-right">
                    {data.balance}
              </div> 
              <div className="col-span-4 flex items-center bg-gray-50 px-1 py-0.5 rounded font-semibold">
                    Total
              </div> 
              <div className="col-span-1  font-semibold text-right">
                   {data.asset_total }
              </div>  
              <div className="col-span-3 "></div>
              <div className="col-span-2 grid grid-cols-3 gap-3 ">
                  <div className="col-span-2 font-bold">
                    Total Assets
                  </div>
                  <div className="col-span-1 text-right">
                  {data.asset_total }
                  </div>
                  <div className="col-span-2 font-bold">
                    Total Liability
                  </div>
                  <div className="col-span-1 text-right">
                  {data.liability_total}
                  </div>
                  <div className="col-span-full grid grid-cols-3  border-t-4 border-b-4 p-2">
                  <div className="col-span-2 font-bold text-lg ">
                  {data.profit_or_loss >0 ? "Profit" : "Loss"}
                  </div>
                  <div className="col-span-1 text-right font-bold text-lg">
                   {data.profit_or_loss}
                  </div>
                  </div>
              </div>
          </div>
        </div>


     </div>
     </div>
     ):( 
      <p></p>
     )} 
  </div>
  );
}

export default BalancesheetandPRofit;
