import React from 'react';

const About = () => {
    return (
        <div className='w-full grid grid-cols-2 gap-4 shadow-sm bg-white  border-neutral-200 px-4 py-3  border  ' >
            <div className="md:col-span-1 col-span-2">
                <h1 className='font-semibold text-xl'>About the Software:</h1>
                <p>Harisree is a comprehensive and user-friendly software solution developed by Abhinav shyju. This versatile application is tailored to meet the diverse needs of Harisree Self Help Group, Kavumvattam , empowering it to manage accounts and other financial aspects efficiently.</p>
            </div>
            <div className="md:col-span-1 flex flex-col col-span-2 gap-3">
                <div className="">
                <h1 className='font-semibold text-xl'>Contact Information:</h1>
            <p>For inquiries or support, please contact Abhinav shyju at <br></br> E-Mail :<a className='text-blue-400' href="mailto:abhinavshyju077@gmail.com">@abhinavshyju077@gmail.com</a> <br></br> 
            Instagram : <a href="https://www.instagram.com/_abhinav_shyju_"  className='text-blue-400'>_abhinav_shyju_</a></p>
            
                </div>
           <h1 className=' text-xl font-bold'>© 2023 Abhinav Shyju . All rights reserved.</h1>
            </div>
        </div>
    );
}

export default About;
