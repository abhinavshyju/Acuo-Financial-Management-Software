const { contextBridge, ipcRenderer } = require("electron");
const db = require("./db");

const getData = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM RegisterLog";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getMemberInfo = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM MemberInfo";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
const getLoanInfo = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM loan";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
const getAccounts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM accounts";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
const getExpense = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Expense";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
const getBank = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Log";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
const GetExtraincome = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ExtraSavings";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
const GetTemp = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM temp WHERE id = 1";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
const GetBankInfo = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM BankInfo";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const GetMeteData = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM basicINfo";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const GetAdditionalLoanLog = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM AdditionalloanLog";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
const GetAdditionalLoan = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Additionalloan";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const GetFine = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Fine";

    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error selecting data from the database:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

contextBridge.exposeInMainWorld("FrontendAPI", {
  LogData: getData,
  MemberInfo: getMemberInfo,
  LoanInfo: getLoanInfo,
  accountsInfo: getAccounts,
  expenseInfo: getExpense,
  bankDetails: getBank,
  extraIncome: GetExtraincome,
  gettemp: GetTemp,
  getBankInfo: GetBankInfo,
  metadata: GetMeteData,
  getAdditionalloan: GetAdditionalLoan,
  getFine: GetFine,
  getadditionalloanlog: GetAdditionalLoanLog,
});

contextBridge.exposeInMainWorld("BackendAPI", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  print: (channel) => ipcRenderer.send(channel),
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, data) => {
      func(data);
    });
  },
});
