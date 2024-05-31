import React, { useState } from 'react';
import logo  from '../../images/logo.png';
import { getGlobalValue, setGlobalValue } from '../../Globel';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const [username, SetUsername]= useState();
    const [password, Setpassword] = useState();
    const navigate = useNavigate();
    const [Alert,Setalert] = useState(false);


    const auth = getGlobalValue();
    if(auth){
        navigate('/');
    }
    const LogIn = (e)=>{
        e.preventDefault()
        if(username === "harisree" && password === "harisree597"){
            setGlobalValue(true)
            Setalert(false)
            navigate('/')
        }else{
            Setalert(true)
            setGlobalValue(false)
        }
    }




    return (
        <div className='flex justify-center w-full h-screen items-center'>
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 w-full">
	<div className="mb-8 text-center">
        <div className="flex items-start gap-5"><img src={logo} alt="" className='w-24' />
		<div className="
        ">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
        <p className="text-sm text-gray-600">Sign in to access your account</p></div></div>
		
	</div>
	<form onSubmit={LogIn} className="space-y-12">
		<div className="space-y-4">
			<div>
				<label for="username" className="block mb-2 text-sm">Username</label>
				<input type="username" name="username" required id="username" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" 
                value={username}
                onChange={e=> SetUsername(e.target.value)}/>
			</div>
			<div>
				<div className="flex justify-between mb-2">
					<label for="password" className="text-sm">Password</label>
					{/* <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a> */}
				</div>
				<input type="password" name="password" required id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" 
                value={password}
                onChange={e=> Setpassword(e.target.value)}/>
			</div>
		</div>
		<div className="space-y-2">
			<div>
				<button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50">Sign in</button>
			</div>
            {Alert ? <p className='text-red-600'>
                Invalid login credentials
            </p> : ""}
			{/* <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
				<a rel="noopener noreferrer" href="#" className="hover:underline text-violet-600">Sign up</a>.
			</p> */}
		</div>
	</form>
</div>
        </div>
    );
}

export default Login;
