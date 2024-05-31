import React from 'react';
import MinCard from '../../Components/NanoComponents/MinCard';
import Chart from '../../Components/Chart';
import { Fetching, } from '../../MainFunctions';

const HomePage = () => {

    const log_for_chart = Fetching("accounts")
    const Member_info = Fetching("members")
    const Bank_details = Fetching("bank")
    console.log(Bank_details)
    
let TotalSavings;
let PendingLoan;
let totalMagalam;

    if(Member_info){
        TotalSavings = Member_info.reduce((total ,e)=> total + Number(e.totalsavings),0);
        PendingLoan = Member_info.reduce((total ,e)=> total + Number(e.loan),0);
    }
    if (log_for_chart) {
        totalMagalam= log_for_chart.reduce((total, e)=> total + Number(e.magalam),0)
    }


    const Date = []
    const loan = []
    const savings = []
    const magalam = []
   if(log_for_chart){
    log_for_chart.slice(-5).map((e)=>{
        Date.push(e.date)
        loan.push(e.loan)
        savings.push(e.asset)
        magalam.push(e.magalam)

    })  
   }



    const ElementName = ["Savings" ,"Loan","Magalam"];
    const ChartDates = Date;
    const DataSeries =  [{
        name: 'Savings',
        type: 'bar',
        data: savings
      },
      {
          name: 'Loan',
          type: 'bar',
          data: loan
        },
        {
            name: 'Magalam',
            type: 'bar',
            data: magalam
          }]


    return (
        <div className='w-full py-10 px-6'>
            <div className="flex">
            <h1 className='font-bold text-4xl'>Dashbord</h1>
            </div>
            <div className="grid grid-cols-7 gap-6 mt-8 ">
                <div className="grid grid-cols-3 gap-5 col-span-full lg:col-span-5">
                   <div className="col-span-1 w-full">
                    <MinCard title="Total Savings" number={TotalSavings} colour= "bg-[#F5F2FDFF] "/>
                   </div>
                   <div className="col-span-1">
                    <MinCard title="Pending loan amount" number={PendingLoan} colour= "bg-[#F1F4FDFF]"/>
                   </div>
                   <div className="col-span-1">
                    <MinCard title="Total Magalam" number={totalMagalam} colour= "bg-[#FEF6F1FF]"/>
                   </div>

                   <div className="col-span-full px-6 pt-6 border rounded border-neutral-200 ">
                    <div className="flex justify-between mb-8">
                        <h1 className='text-2xl font-bold leading-7' > Statistics</h1>
                        
                    </div>
                    <Chart 
                        // title = "Title"
                        dataeleName = {ElementName}
                        dataName={ChartDates} 
                        mainData={DataSeries} 
                    />
                </div>
                </div>
                <div className=" col-span-full lg:col-span-2  shadow-sm rounded px-5 py-6 ">
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

export default HomePage;
