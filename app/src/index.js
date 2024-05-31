import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import DefaultLayout from './Layout/DefaultLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/layout';
import Landingpage from './Layout/Landingpage';
import HomePage from './Layout/Pages/Homepage/HomePage';
import Login from './Layout/Pages/Login';
import BankTransactionview from './Layout/Pages/Bank/BankTransactionview';
import Expense from './Layout/Pages/Expense/Expense';
import Income from './Layout/Pages/Expense/income';
import ExtraIncome from './Layout/Pages/Expense/Extraincome ';
import Ledgerlayout from './Layout/Pages/Ledger/Ledgerlayout';
import ViewLoan from './Layout/Pages/Loan/ViewLoan';
import AddLoan from './Layout/Pages/Loan/AddLoan';
import LoanInduvidual from './Layout/Pages/Loan/LoanInduvidual';
import RegiterView from './Layout/Pages/Register/RegiterView';
import RegisterAdd from './Layout/Pages/Register/RegisterAdd';
import RegisterEdit from './Layout/Pages/Register/RegisterEdit';
import ViewMembers from './Layout/Pages/Member/ViewMembers';
import ViewMembersEdit from './Layout/Pages/Member/ViewAndEditMember';
import AddMember from './Layout/Pages/Member/AddMember.';
import EditMember from './Layout/Pages/Member/EditMember';
import Settings from './Layout/Pages/MetaData/Settings';
import AddnewBank from './Layout/Pages/MetaData/AddnewBank';
import Addmetadata from './Layout/Pages/MetaData/Addmetadata';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <div className='mainDiv flex w-full'>
    <SideBar/>
      <div className='w-full content'  >
        <NavBar/>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/adddata' element={<DataAddPage />} />
          <Route path='/viewdata' element={<DataView/>}/>
          <Route path='/membersinfo' element={<MemebersInfo/>}/>
          <Route path='/addnew' element={<AddNewMember/>}/>
          <Route path="/user/:id" element={<LogEdit />} />
          <Route path='/loan' element={<AddLoan/>}/>
          <Route path='/editmember' element={<MemberEdit/>} />
          <Route path='/statement' element={<Statement/>}/>
          <Route path='/totalloan' element={<Totalloan/>}/>
          <Route path='/adminview' element={<Adminedit/>}/>
          <Route path='/editadmin/:id' element={<Editform/>}/>
        </Routes>
      </div>
    </div> */}
    <>
    {/* <NavingationBar/>
     */}


  <DefaultLayout/>

   
    



     {/* <BrowserRouter>
     <Routes>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/' element={<Layout/>}>
        <Route path='' element={<HomePage/>}/>

            <Route path="/bank" element={<BankTransactionview/>} />


            <Route path='/expense' element ={<Expense/>} />
            <Route path='/income' element ={<Income/>} />
            <Route path='/extraincome' element ={<ExtraIncome />} />

            <Route path='/ledger' element={<Ledgerlayout/>}/>



            <Route path='/loan' element={<ViewLoan/>}/>
            <Route path='/loan/add' element={<AddLoan/>}/>
            <Route path='/loan/:name/:id' element={<LoanInduvidual/>}/>


            
            <Route path='/log' element={<RegiterView/>}/>
            <Route path='/log/add' element={<RegisterAdd/>}/>
            <Route path='/log/edit/:id' element={<RegisterEdit/>}/>



            <Route path='/members' element={<ViewMembers/>}/>
            <Route path='/members/add' element={<AddMember/>}/>
            <Route path='/members/edit' element={<ViewMembersEdit/>}/>
            <Route path='/members/edit/:id' element={<EditMember/>}/>


            <Route path="/settings" element={<Settings/>}/>


            <Route path='/editbank' element={<AddnewBank/>}/>
            <Route path='/editmetadata' element={<Addmetadata/>}/>
            <Route path='/incomeandexpenseedit'/>
        </Route>
     </Routes>
     </BrowserRouter> */}

    </>
    {/* </BrowserRouter>   */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
