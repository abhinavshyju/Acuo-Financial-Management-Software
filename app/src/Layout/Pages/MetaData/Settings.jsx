import React from 'react';
import { Link } from 'react-router-dom';
import About from './About';

const Settings = () => {
    return (
      
      <div className="mx-auto px-4 md:px-6 pt-10  pb-3 flex flex-col  gap-7 h-screen justify-between ">
      <div className="">
      <div className="flex mb-8">
          <h1 className='font-bold text-4xl'>Settings</h1>
      </div>
        {/* <h1 className='text-xl font-bold'> Edit metadata </h1> */}
        <div className="grid grid-cols-4 mt-10  gap-5">
            <Link to="/editbank">
            <div className="col-span-full lg:col-span-1 h-40 rounded-md shadow-sm bg-white border border-neutral-200 px-4 py-3   flex flex-col justify-between ">
           <div className="flex items-end mt-4 ">
           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32" id="bank"><g data-name="Layer 2"><polygon fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="3 9 16 3 29 9 3 9"></polygon><line x1="3" x2="29" y1="29" y2="29" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="5" x2="27" y1="26" y2="26" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="5" x2="27" y1="12" y2="12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="7" x2="7" y1="15" y2="23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="13" x2="13" y1="15" y2="23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="19" x2="19" y1="15" y2="23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="25" x2="25" y1="15" y2="23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line></g></svg>
                <h1 className='font-semibold text-3xl ml-3'>Bank</h1>
           </div>
                <div className="flex justify-between"><h1 className=''>Add and Remove</h1> <span className='text-blue-400'>Edit </span></div>
            </div>
            </Link>
            <Link to="/editmetadata">
            <div className="col-span-full lg:col-span-1 h-40 rounded-md shadow-sm bg-white  border-neutral-200 px-4 py-3  border flex flex-col justify-between ">
           <div className="flex items-end mt-4 ">
           <svg width="50px" height="50px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <g id="🔍 -Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="ic_fluent_mail_all_accounts_24_regular" fill="#212121" fill-rule="nonzero">
                            <path d="M6.25,3 L17.75,3 C19.4830315,3 20.8992459,4.35645477 20.9948552,6.06557609 L21,6.25 L21,17.75 C21,19.4830315 19.6435452,20.8992459 17.9344239,20.9948552 L17.75,21 L6.25,21 C4.51696854,21 3.10075407,19.6435452 3.00514479,17.9344239 L3,17.75 L3,6.25 C3,4.51696854 4.35645477,3.10075407 6.06557609,3.00514479 L6.25,3 Z M8.32501359,14.5 L4.5,14.5 L4.5,17.75 C4.5,18.6681734 5.20711027,19.4211923 6.10647279,19.4941988 L6.25,19.5 L17.75,19.5 C18.6681734,19.5 19.4211923,18.7928897 19.4941988,17.8935272 L19.5,17.75 L19.5,14.5 L15.6749864,14.5 C15.3404023,16.1482847 13.9247166,17.4039882 12.2002976,17.4947422 L12,17.5 C10.2529748,17.5 8.78497652,16.3053441 8.36837329,14.6884005 L8.32501359,14.5 Z M17.75,4.5 L6.25,4.5 C5.3318266,4.5 4.57880766,5.20711027 4.5058012,6.10647279 L4.5,6.25 L4.5,13 L9,13 C9.37969577,13 9.69349096,13.2821539 9.74315338,13.6482294 L9.75,13.75 C9.75,14.9926407 10.7573593,16 12,16 C13.190864,16 14.1656449,15.0748384 14.2448092,13.9040488 L14.25,13.75 C14.25,13.3703042 14.5321539,13.056509 14.8982294,13.0068466 L15,13 L19.5,13 L19.5,6.25 C19.5,5.3318266 18.7928897,4.57880766 17.8935272,4.5058012 L17.75,4.5 Z M6.75,9.5 L17.25,9.5 C17.6642136,9.5 18,9.83578644 18,10.25 C18,10.6296958 17.7178461,10.943491 17.3517706,10.9931534 L17.25,11 L6.75,11 C6.33578644,11 6,10.6642136 6,10.25 C6,9.87030423 6.28215388,9.55650904 6.64822944,9.50684662 L6.75,9.5 L17.25,9.5 L6.75,9.5 Z M6.75,6.5 L17.25,6.5 C17.6642136,6.5 18,6.83578644 18,7.25 C18,7.62969577 17.7178461,7.94349096 17.3517706,7.99315338 L17.25,8 L6.75,8 C6.33578644,8 6,7.66421356 6,7.25 C6,6.87030423 6.28215388,6.55650904 6.64822944,6.50684662 L6.75,6.5 L17.25,6.5 L6.75,6.5 Z" id="🎨-Color"></path>
                        </g>
                    </g>
                </svg>           <h1 className='font-semibold text-3xl ml-3'>MetaData</h1>
           </div>
                <div className="flex justify-between"><h1 className=''>Edit metadate </h1> <span className='text-blue-400'>Edit </span></div>
            </div>
            </Link>
            <Link to="/members/edit">
            <div className="col-span-full lg:col-span-1 h-40 rounded-md shadow-sm bg-white  border-neutral-200 px-4 py-3  border flex flex-col justify-between ">
           <div className="flex items-end mt-4 ">
           <svg className="w-[50px] h-[50px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>      <h1 className='font-semibold text-3xl ml-3'>Member</h1>
           </div>
                <div className="flex justify-between"><h1 className=''>Edit Members info </h1> <span className='text-blue-400'>Edit </span></div>
            </div>
            </Link>
            {/* <div className="col-span-full lg:col-span-1 h-40 rounded-md shadow-sm bg-white  border-neutral-200 px-4 py-3  border flex flex-col justify-between ">
           <div className="flex items-end mt-4 ">
           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"viewBox="0 0 384 512"><path d="M384 128h-128V0L384 128zM256 160H384v304c0 26.51-21.49 48-48 48h-288C21.49 512 0 490.5 0 464v-416C0 21.49 21.49 0 48 0H224l.0039 128C224 145.7 238.3 160 256 160zM64 88C64 92.38 67.63 96 72 96h80C156.4 96 160 92.38 160 88v-16C160 67.63 156.4 64 152 64h-80C67.63 64 64 67.63 64 72V88zM72 160h80C156.4 160 160 156.4 160 152v-16C160 131.6 156.4 128 152 128h-80C67.63 128 64 131.6 64 136v16C64 156.4 67.63 160 72 160zM197.5 316.8L191.1 315.2C168.3 308.2 168.8 304.1 169.6 300.5c1.375-7.812 16.59-9.719 30.27-7.625c5.594 .8438 11.73 2.812 17.59 4.844c10.39 3.594 21.83-1.938 25.45-12.34c3.625-10.44-1.891-21.84-12.33-25.47c-7.219-2.484-13.11-4.078-18.56-5.273V248c0-11.03-8.953-20-20-20s-20 8.969-20 20v5.992C149.6 258.8 133.8 272.8 130.2 293.7c-7.406 42.84 33.19 54.75 50.52 59.84l5.812 1.688c29.28 8.375 28.8 11.19 27.92 16.28c-1.375 7.812-16.59 9.75-30.31 7.625c-6.938-1.031-15.81-4.219-23.66-7.031l-4.469-1.625c-10.41-3.594-21.83 1.812-25.52 12.22c-3.672 10.41 1.781 21.84 12.2 25.53l4.266 1.5c7.758 2.789 16.38 5.59 25.06 7.512V424c0 11.03 8.953 20 20 20s20-8.969 20-20v-6.254c22.36-4.793 38.21-18.53 41.83-39.43C261.3 335 219.8 323.1 197.5 316.8z"/></svg>
   <h1 className='font-semibold text-3xl ml-3'>Income & Expense</h1>
           </div>
                <div className="flex justify-between"><h1 className=''>Edit Income and expense </h1> <span className='text-blue-400'>Edit </span></div>
            </div> */}
        </div>
      </div>
        <About/>
    </div>
    );
}

export default Settings;
