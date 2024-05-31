import React from 'react';
import IncomeandExpenditureAccount from './IncomeandExpenditureAccount';
import BaletSheet from './BaletSheet';

const Ledgerlayout = () => {
    
    return (
        <div className="mx-auto px-4 md:px-6 mt-10 pb-10" >
           
        <div className="flex mb-8">
            <h1 className='font-bold text-4xl'>Ledger </h1>
        </div>
           {/* <div className="col-span-full lg:col-span-3">
           <IncomeandExpenditureAccount/>
           </div>
           <div className="col-span-full 
           
           "> */}
            {/* lg:col-span-4 */}
           <BaletSheet/>
           </div>
        // </div>
    );
}

export default Ledgerlayout;
