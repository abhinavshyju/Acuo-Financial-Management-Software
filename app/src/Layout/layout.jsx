import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideNav from './Components/SideNav';
import { getGlobalValue } from '../Globel';

const Layout = () => {
    const navigate = useNavigate();
    const auth = getGlobalValue();
    console.log(auth)

    useEffect(() => {
        if(!auth){
            navigate('/login');
        }
    }, []);

    if(auth){
        return (
        
            <div className='w-full flex bg-[#f9fafb] min-h-screen '>
           <div className="fixed ">
           <SideNav/>
           </div>
           <div className="w-full flex-1 pl-[256px] bg-white">
           {/* <MainNav/> */}
           <div className="bg-white">
             <Outlet/>
             </div>
         </div>
     </div>
 
     );
    }else{
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-600"></div>
    }
   
}

export default Layout;
