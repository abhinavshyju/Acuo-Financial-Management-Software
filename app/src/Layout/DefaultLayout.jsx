import React from "react";
import MainNav from "./Components/MainNav";
import SideNav from "./Components/SideNav";
import Table from "./Components/Table";
import TableComp from "./Components/Table";
import SubNav from "./Components/NanoComponents/SubNav";
import RegisterAdd from "./Pages/Register/RegisterAdd";
import AddMember from "./Pages/Member/AddMember.";
import ViewMembers from "./Pages/Member/ViewMembers";
import EditMember from "./Pages/Member/EditMember";
import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage";
import ViewMembersEdit from "./Pages/Member/ViewAndEditMember";
import RegisterLayout from "./Pages/Register/RegisterLayout";
import RegisterEdit from "./Pages/Register/RegisterEdit";
import AddLoan from "./Pages/Loan/AddLoan";
import ViewLoan from "./Pages/Loan/ViewLoan";
import LoanInduvidual from "./Pages/Loan/LoanInduvidual";
import BaletSheet from "./Pages/Ledger/BaletSheet";
import Expense from "./Pages/Expense/Expense";
import IncomeandExpenditureAccount from "./Pages/Ledger/IncomeandExpenditureAccount";
import Ledgerlayout from "./Pages/Ledger/Ledgerlayout";
import RegiterView from "./Pages/Register/RegiterView";
import Income from "./Pages/Expense/income";
import ExtraIncome from "./Pages/Expense/Extraincome ";
import BankTransactionview from "./Pages/Bank/BankTransactionview";
import Settings from "./Pages/MetaData/Settings";
import AddnewBank from "./Pages/MetaData/AddnewBank";
import Addmetadata from "./Pages/MetaData/Addmetadata";
import Landingpage from "./Landingpage";
import ViewSavings from "./Pages/Member/ViewSavings";
import WeeklyRecord from "./Pages/Samakrtham";
import ViewAdditionalLoan from "./Pages/AdditionalLoan/AdditionalLoan";
import AddAddtionalLoan from "./Pages/AdditionalLoan/AddAdditionalLoan";
import FineScreen from "./Pages/Fine/FineScreen";
import FineIndividual from "./Pages/Fine/FineIndividual";
import AdditionalLoanInduvidual from "./Pages/AdditionalLoan/AdditionalLoanIndividual";

const DefaultLayout = () => {
  return (
    <BrowserRouter>
      <div className="w-full flex bg-[#f9fafb] min-h-screen ">
        <div className="fixed ">
          <SideNav />
        </div>
        <div className="w-full flex-1 pl-[256px] bg-white">
          {/* <MainNav/> */}
          <div className="bg-white">
            <Routes>
              {/* <Route path="/" element={<Landingpage />} /> */}
              <Route path="/" element={<BaletSheet />} />
              <Route path="/home" element={<HomePage />} />

              <Route path="/bank" element={<BankTransactionview />} />

              <Route path="/expense" element={<Expense />} />
              <Route path="/income" element={<Income />} />
              <Route path="/extraincome" element={<ExtraIncome />} />

              <Route path="/ledger" element={<Ledgerlayout />} />

              <Route path="/loan" element={<ViewLoan />} />
              <Route path="/loan/add" element={<AddLoan />} />
              <Route path="/loan/:name/:id" element={<LoanInduvidual />} />

              <Route path="/addloan" element={<ViewAdditionalLoan />} />
              <Route
                path="/addloan/:name/:id"
                element={<AdditionalLoanInduvidual />}
              />
              <Route path="/addloan/add" element={<AddAddtionalLoan />} />

              <Route path="/fine" element={<FineScreen />} />
              <Route path="/fine/:name/:id" element={<FineIndividual />} />

              {/* <Route path='/log' element={<RegisterLayout/>}/> */}
              <Route path="/log" element={<RegiterView />} />
              <Route path="/log/add" element={<RegisterAdd />} />
              <Route path="/log/edit/:id" element={<RegisterEdit />} />

              <Route
                path="members/savings/:name/:id"
                element={<ViewSavings />}
              />

              <Route path="/members" element={<ViewMembers />} />
              <Route path="/members/add" element={<AddMember />} />
              <Route path="/members/edit" element={<ViewMembersEdit />} />
              <Route path="/members/edit/:id" element={<EditMember />} />

              <Route path="/weeklyrecord" element={<WeeklyRecord />} />

              <Route path="/settings" element={<Settings />} />

              <Route path="/editbank" element={<AddnewBank />} />
              <Route path="/editmetadata" element={<Addmetadata />} />
              <Route path="/incomeandexpenseedit" />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default DefaultLayout;
