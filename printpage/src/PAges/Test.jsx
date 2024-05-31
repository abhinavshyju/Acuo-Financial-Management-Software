import moment from 'moment';
import React from 'react';
import logo from '../logo.png'
const Test = () => {
    const Date = moment().format('L');
    return (
        <div  className='w-full'>
            <div className="flex w-full justify-center items-center">
            <img className="h-16 mr-4" src={logo} alt="" srcset="" />
            <div className=" ">
            <h1 className='font-bold text-2xl text-center nato'>ഹരിശ്രീ സ്വയംസഹായ സംഘം,</h1>
            <h1 className='font-semibold text-xl text-center nato'>കാവുംവട്ടം </h1> 
            </div>
            </div>
           <div className="flex justify-between  mt-11 ">
            <div className="">
                {/* <h1>Address : l </h1> */}
            </div>
            <div className="">
            <h1 className='text-right'>Reg No. 597 IDC</h1>
            <h1 className='text-right mt-1'>Date : {Date}</h1>
            </div>
           </div>
            
        </div>
    );
}

export default Test;
