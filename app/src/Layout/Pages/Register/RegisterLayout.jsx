import React from 'react';
import RegiterView from './RegiterView';
import RegisterAdd from './RegisterAdd';
import RegisterEdit from './RegisterEdit';
import { Route, Routes } from 'react-router-dom';

const RegisterLayout = () => {
    return (
        <div className="mx-auto px-4 md:px-6 mt-10">
            <div className="flex">
                <h1 className='font-bold text-4xl'>Accounts</h1>
            </div>
            <Routes>
            <Route path='/' element={<RegiterView/>}/>
            <Route path='/add' element={<RegisterAdd/>}/>
            <Route path='/log/edit/:id' element={<RegisterEdit/>}/>
            </Routes>
        </div>
    );
}

export default RegisterLayout;
