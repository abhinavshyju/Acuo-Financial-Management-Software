import { useEffect, useState } from "react";
const apiCall = window.FrontendAPI;

export const Fetching = (sort) => {
  const apiCall = window.FrontendAPI;
  const [FetchData, SetFetchData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        if (sort === "log") {
          const data = await apiCall.LogData();
          SetFetchData(data);
        } else if (sort === "accounts") {
          const data = await apiCall.accountsInfo();
          SetFetchData(data);
        } else if (sort === "members") {
          const data = await apiCall.MemberInfo();
          SetFetchData(data);
        } else if (sort === "bank") {
          const data = await apiCall.bankDetails();
          SetFetchData(data);
        } else if (sort === "meta") {
          const data = await apiCall.metadata();
          SetFetchData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return FetchData;
};

export const Ledger = (startDate, endDate) => {
  // const startDate = "11/27/2023";
  // const endDate = "12/4/2023"
  const apiCall = window.FrontendAPI;

  const [LogData, SetLogData] = useState("");
  const [incomeandexpense, Setincomeandexpense] = useState("");
  const [loandata, SetLoan] = useState("");
  const [ExtraIncome, SetExtraIncome] = useState("");
  const [accounts, SetAccounts] = useState("");
  const [Finedata, setFinedata] = useState([]);
  const [bankBalance, SetBankBalance] = useState("");
  const [addloan, setaddloan] = useState([]);
  const [addloanLog, setaddloanLog] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data1 = await apiCall.LogData();
        SetLogData(data1);
        const data2 = await apiCall.expenseInfo();
        Setincomeandexpense(data2);
        const data3 = await apiCall.LoanInfo();
        SetLoan(data3);
        const data4 = await apiCall.extraIncome();
        SetExtraIncome(data4);
        const data5 = await apiCall.accountsInfo();
        SetAccounts(data5);
        const data6 = await apiCall.getBankInfo();
        SetBankBalance(data6);
        const data7 = await apiCall.getFine();
        setFinedata(data7);
        const data8 = await apiCall.getAdditionalloan();
        setaddloan(data8);
        const data9 = await apiCall.getadditionalloanlog();
        setaddloanLog(data9);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  let SortLogData = 0;
  let SortIncomeAndExpense;
  let loan = 0;
  let Savings = 0;
  let loanToSubtract = 0;
  let AddloanToSubtract = 0;
  let Loan = 0;
  let AddLoan = 0;
  let magalam = 0;
  let extraIncome = 0;
  let fine = 0;
  let interest = 0;

  const expense = [];
  const income = [];
  const bankInterset = [];
  let total_income = 0;
  let balance = 0;
  let totalLeft = 0;
  let totalRight = 0;
  let ProLoss = 0;
  let PrePofitorLoss = 0;
  let bankIntersetamount = 0;

  if (loandata && LogData && incomeandexpense && ExtraIncome && accounts) {
    loan = loandata.filter((date) => new Date(date.date) <= new Date(endDate));
    loan = loan.reduce((total, e) => total + Number(e.interest), 0);

    AddLoan = addloan.filter(
      (date) => new Date(date.date) <= new Date(endDate)
    );

    AddLoan = AddLoan.reduce((total, e) => total + Number(e.amount), 0);

    const SortAccounts = accounts.filter(
      (date) => new Date(date.date) <= new Date(endDate)
    );

    SortLogData = LogData.filter(
      (date) => new Date(date.date) <= new Date(endDate)
    );
    const SortAddLogData = addloanLog.filter(
      (date) => new Date(date.date) <= new Date(endDate)
    );
    const Sortmagalam = accounts.filter(({ date }) => {
      const currentDate = new Date(date);
      return (
        currentDate >= new Date(startDate) && currentDate <= new Date(endDate)
      );
    });
    const Sortfine = Finedata.filter(({ date }) => {
      const currentDate = new Date(date);
      return (
        currentDate >= new Date(startDate) && currentDate <= new Date(endDate)
      );
    });
    Savings = SortAccounts.reduce((total, item) => total + item.asset, 0);
    loanToSubtract = SortLogData.reduce((total, item) => total + item.loan, 0);
    AddloanToSubtract = SortAddLogData.reduce(
      (total, item) => total + item.amount,
      0
    );
    magalam = Sortmagalam.reduce((total, item) => total + item.magalam, 0);
    interest = Sortmagalam.reduce((total, e) => total + e.interest, 0);
    fine = Sortfine.reduce((total, e) => total + e.amount, 0);

    SortIncomeAndExpense = incomeandexpense.filter(({ date }) => {
      const currentDate = new Date(date);
      return (
        currentDate >= new Date(startDate) && currentDate <= new Date(endDate)
      );
    });
    SortIncomeAndExpense.map((e) => {
      if (e.type === "income") {
        income.push(e);
      } else if (e.type === "expense") {
        expense.push(e);
      } else {
        bankInterset.push(e);
      }
    });

    extraIncome = ExtraIncome.filter(({ date }) => {
      const currentDate = new Date(date);
      return (
        currentDate >= new Date(startDate) && currentDate <= new Date(endDate)
      );
    });

    bankIntersetamount = bankInterset.reduce(
      (total, e) => total + Number(e.ammount),
      0
    );
    total_income =
      Savings +
      income.reduce((total, e) => total + Number(e.ammount), 0) +
      extraIncome.reduce((total, e) => total + Number(e.ammount), 0) +
      bankInterset.reduce((total, e) => total + Number(e.ammount), 0);

    loan = loan - loanToSubtract;

    AddLoan = AddLoan - AddloanToSubtract;
    console.log(AddloanToSubtract);

    balance =
      Number(total_income) -
      (Number(loan) +
        Number(AddLoan) +
        expense.reduce((total, e) => total + Number(e.ammount), 0));

    totalRight =
      loan +
      AddLoan +
      expense.reduce((total, e) => total + Number(e.ammount), 0);

    console.log({
      total_income,
      TotalRight:
        Number(loan) +
        Number(AddLoan) +
        expense.reduce((total, e) => total + Number(e.ammount), 0),
    });
    const PreSortAccounts = accounts.filter(
      (date) => new Date(date.date) < new Date(startDate)
    );
    // console.log(PreSortAccounts)
    const PreextraIncome = ExtraIncome.filter(
      (date) => new Date(date.date) < new Date(startDate)
    );
    const PreSortLogData = LogData.filter(
      (date) => new Date(date.date) < new Date(endDate)
    );
    const PreSortAddLog = addloanLog.filter(
      (date) => new Date(date.date) < new Date(endDate)
    );
    // console.log(PreSortLogData)
    let preloan = loandata.filter(
      (date) => new Date(date.date) < new Date(startDate)
    );
    let preAddloan = addloan.filter(
      (date) => new Date(date.date) < new Date(startDate)
    );

    let preincome = 0;
    let perexpense = 0;

    let preSortIncomeAndExpense = incomeandexpense.filter(
      (date) => new Date(date.date) < new Date(startDate)
    );
    preSortIncomeAndExpense.map((e) => {
      if (e.type === "income") {
        preincome += Number(e.ammount);
      } else if (e.type === "expense") {
        perexpense += Number(e.ammount);
      }
    });
    const preSortmagalam = accounts.filter(
      (date) => new Date(date.date) < new Date(startDate)
    );
    const preSortfine = Finedata.filter(
      (date) => new Date(date.date) < new Date(startDate)
    );
    const preSavings = PreSortAccounts.reduce(
      (total, item) => total + item.asset,
      0
    );
    const preExtraIncome = PreextraIncome.reduce(
      (total, e) => total + Number(e.ammount),
      0
    );
    const preloanToSubtract = PreSortLogData.reduce(
      (total, item) => total + item.loan,
      0
    );
    const preAddloantoSubtract = PreSortAddLog.reduce(
      (total, e) => total + Number(e.amount),
      0
    );
    preloan = preloan.reduce((total, e) => total + Number(e.interest), 0);

    preAddloan = preAddloan.reduce((total, e) => total + Number(e.amount), 0);

    preloan = preloan - preloanToSubtract;
    preAddloan = preAddloan - preAddloantoSubtract;

    const premagalam = preSortmagalam.reduce(
      (total, item) => total + item.magalam,
      0
    );
    const prefine = preSortfine.reduce((total, item) => total + item.amount, 0);
    const preinterest = preSortmagalam.reduce(
      (total, item) => total + item.interest,
      0
    );

    PrePofitorLoss =
      Number(preSavings) +
      Number(preincome) +
      Number(preExtraIncome) +
      Number(premagalam) +
      Number(prefine) +
      Number(preinterest) -
      Number(perexpense) -
      (Number(preSavings) + Number(preExtraIncome));

    // PrePofitorLoss =10;
    ProLoss =
      loan +
      AddLoan -
      (Savings +
        extraIncome.reduce((total, e) => total + Number(e.ammount), 0));

    totalLeft = total_income + magalam + interest + fine + PrePofitorLoss;

    balance =
      Number(totalLeft) -
      (Number(loan) +
        Number(AddLoan) +
        expense.reduce((total, e) => total + Number(e.ammount), 0));

    // console.log(preincome)
    // console.log(PrePofitorLoss)
  }

  const Data = {
    total_Assets: Savings,
    loan: loan,
    AdditionalLoan: AddLoan,
    magalam: magalam,
    expense: expense,
    balance: balance,
    income: income,
    exraincome: extraIncome,
    total_income: total_income,

    bankinterest: bankIntersetamount,
    interest: interest,
    fine: fine,
    prevProfit: PrePofitorLoss,

    totalLeft: totalLeft,
    totalRight: totalRight,

    ProLoss: ProLoss,
  };

  return Data;
};

export const BankInfo = () => {
  const [data, SetData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiCall.getBankInfo();
        SetData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return data;
};

// Ledger();
