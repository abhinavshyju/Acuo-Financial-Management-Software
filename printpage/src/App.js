import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import BalancesheetandPRofit from "./PAges/BalancesheetandPRofit";
import IncomeandExpenditureAccount from "./PAges/IncomeandExpenditureAccount";
import Test from "./PAges/Test";
import moment from "moment";
import MainPage from "./PAges/MainPage";

function App() {
  return (
    <div>
      {" "}
      {/* <Test/> */}{" "}
      {/* <BalancesheetandPRofit/>
                <IncomeandExpenditureAccount/>  */}{" "}
      <MainPage />{" "} 
      {/* <BalancesheetandPRofit/>
                <div class="pagebreak"> </div>
                <IncomeandExpenditureAccount/>  */}{" "}
    </div>
  );
}

export default App;
