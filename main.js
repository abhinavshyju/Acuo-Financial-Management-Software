const { app, BrowserWindow, ipcMain, contextBridge } = require("electron");
const path = require("path");
const db = require("./db");
const url = require("url");
const moment = require("moment");
const { error } = require("console");
const PDFWindow = require("electron-pdf-window");
const { measureMemory } = require("vm");
const { copyData } = require("./BackUpDB");

const Date = moment().format("L");

function CreateWindow() {
  const MainWindow = new BrowserWindow({
    title: "App",
    minWidth: 200,
    minHeight: 768,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  MainWindow.webContents.openDevTools();
  MainWindow.maximize();
  MainWindow.removeMenu();
  const StartUrl = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
  });
  // const contents = MainWindow.webContents
  // console.log(contents)
  MainWindow.loadURL(
    // StartUrl
    "http://localhost:3000/"
  );
}
app.whenReady().then(CreateWindow);

ipcMain.on("print-to-pdf", (event, data) => {
  console.log(data);
  db.run(`UPDATE temp SET text = ? WHERE id = 1`, data, (err) => {
    if (err) {
      console.error("Error inserting data into the database:", err.message);
    } else {
      console.log("temp updated .");
    }
  });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const PrintUrl = url.format({
    pathname: path.join(__dirname, "./printpage/build/index.html"),
  });
  mainWindow.loadURL(
    "http://localhost:3001/"
    // PrintUrl
  );
  // mainWindow.webContents.openDevTools();
  mainWindow.webContents.on("did-finish-load", () => {
    // Simulate Ctrl+P to trigger the print dialog
    mainWindow.webContents.print({}, (success, errorType) => {
      if (!success) {
        console.error(`Failed to print: ${errorType}`);
      }
      mainWindow.close();
      console.log("Triggerd");
      // You can handle success or failure as needed
    });
  });
});

const getInfo = new Promise((resolve, reject) => {
  db.all("SELECT * FROM MemberInfo", (err, rows) => {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
  });
});

const metaPromise = new Promise((resolve, reject) => {
  db.all(`SELECT * FROM basicINfo`, (err, rows) => {
    if (err) {
      console.error("Error selecting data from the database:", err.message);
      reject(err);
    } else {
      resolve(rows);
    }
  });
});

ipcMain.on("LogData", async (event, data) => {
  const UserData = data;

  // Add weekly log to the RegiterLog DB
  UserData.forEach((e) => {
    db.run(
      `INSERT INTO RegisterLog(date, username, savings, loan, magalam, fine, interest, gave, attendence)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        e.date,
        e.username,
        e.savings,
        e.loan,
        e.magalam,
        e.fine,
        e.interest,
        e.gave,
        e.attendence == true ? 1 : 0,
      ],
      (err) => {
        if (err) {
          console.error(
            "Error inserting data into the database: 1 :",
            err.message
          );
        } else {
          console.log("UserData inserted into the database.");
        }
        event.reply("adddatares", true);
      }
    );

    metaPromise.then(async (meta) => {
      getInfo.then(async (data) => {
        const LastLogDate = data[0].date;
        // console.log(meta[0])

        if (LastLogDate.slice(0, 2) != Date.slice(0, 2)) {
          db.run(
            "UPDATE MemberInfo SET  pendingmagalam = pendingmagalam + ? WHERE name = ? ",
            [meta[0].magalamincrement, e.name],
            (error) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Row update successfully !");
              }
            }
          );
        }
      });

      db.run(
        `UPDATE MemberInfo SET loan = loan - ? , totalsavings = totalsavings + ? ,pendingmagalam = pendingmagalam - ?,
           pendingsavings = pendingsavings - ? + ? , fine = fine + ?, interest = interest + ?, date = ?   WHERE name = ? `,
        [
          e.loan,
          e.savings,
          e.magalam,
          e.savings,
          meta[0].savingsincrement,
          e.fine,
          e.interest,
          e.date,
          e.username,
        ],
        (err) => {
          if (err) {
            console.log("Error updating data", err);
          } else {
            console.log(`Row with ID ${e.username} has been replaced.`);
          }
        }
      );
    });
  });

  const MeanDate = UserData[0].date;
  const totalAssets = UserData.reduce(
    (total, g) => total + Number(g.savings),
    0
  );
  const loanAmount = UserData.reduce((total, g) => total + Number(g.loan), 0);
  const magalamAmount = UserData.reduce(
    (total, g) => total + Number(g.magalam),
    0
  );
  const totalFine = UserData.reduce((total, e) => total + Number(e.fine), 0);
  const totalInterest = UserData.reduce(
    (total, e) => total + Number(e.interest),
    0
  );

  db.run(
    `INSERT INTO accounts(asset,loan,magalam ,fine ,interest ,date)
            VALUES(?, ?,?,?,?,?)`,
    [
      totalAssets,
      loanAmount,
      magalamAmount,
      totalFine,
      totalInterest,
      MeanDate,
    ],
    (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err.message);
      } else {
        console.log(" Inserted into the database.");
        // console.log(data);
      }
    }
  );
});

ipcMain.on(`bankLog`, (event, data) => {
  db.run(
    ` INSERT INTO Log(date, name , ammount, bank,type)
    VALUES(?,?,?,?,?)`,
    [
      data.date,
      `${data.name} deposit on ${
        data.date.slice(3, 5) +
        "/" +
        data.date.slice(0, 2) +
        "/" +
        data.date.slice(6, 10)
      } as a savings`,
      data.ammount,
      data.bank,
      data.type,
    ],
    (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err.message);
      } else {
        console.log("Log added");
      }
    }
  );
  db.run(
    ` UPDATE BankInfo SET balance = balance + ? WHERE bankname = ?`,
    [data.type === "expense" ? -1 * data.ammount : data.ammount, data.bank],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Balance Added");
      }
    }
  );
});

ipcMain.on("newMember", (event, data) => {
  metaPromise.then(async (meta) => {
    db.run(
      `INSERT INTO MemberInfo(name, phoneNumber, address, date ,pendingmagalam)
          VALUES (?, ?, ?, ?,? )`,
      [
        data.name,
        data.phone,
        data.address,
        data.date,
        meta[0].magalamincrement,
      ],
      (err) => {
        if (err) {
          console.error("Error inserting data into the database:", err.message);
        } else {
          console.log("Member data inserted into the database.");
          event.reply("NewMemberCreated", true);
        }
      }
    );
  });
});

ipcMain.on("LogParam", async (event, data) => {
  db.run(
    "UPDATE RegisterLog SET savings= ?, loan =? , magalam=? , fine = ?, interest = ?, gave = ? , attendence = ? WHERE id = ? ",
    [
      data.savings,
      data.loan,
      data.magalam,
      data.fine,
      data.interest,
      data.gave,
      data.attendence,
      data.id,
    ],
    function (err) {
      if (err) {
        console.error("Error updating row:", err.message);
      } else {
        console.log(`Row with ID ${data.id} has been replaced.`);
      }
    }
  );
  db.run(
    "UPDATE MemberInfo SET loan = loan - ? + ? , totalsavings = totalsavings + ? - ?, pendingmagalam = pendingmagalam + ? - ?, fine = fine + ? -?, interest = interest + ? -?  WHERE name = ? ",
    [
      data.loan,
      data.oldloan,
      data.savings,
      data.oldsavings,
      data.oldmagalam,
      data.magalam,
      data.fine,
      data.oldFine,
      data.interest,
      data.oldInterest,
      data.username,
    ],
    (err) => {
      if (err) {
        console.log("Error updating data", err);
      } else {
        console.log(`Row with ID ${data.username} has been replaced. test`);
      }
    }
  );

  db.run(
    `UPDATE accounts SET asset = asset - ? + ? ,loan = loan + ? - ?,magalam = magalam + ? - ?, fine = fine - ? + ? ,interest = interest -? +? WHERE date = ?`,
    [
      data.oldsavings,
      data.savings,
      data.loan,
      data.oldloan,
      data.oldmagalam,
      data.magalam,
      data.oldFine,
      data.fine,
      data.oldInterest,
      data.interest,
      data.date,
    ],
    (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err.message);
      } else {
        console.log("  accounts update");
      }
    }
  );
});

ipcMain.on("add-loan", async (event, data) => {
  db.run(
    "UPDATE MemberInfo SET loan = loan + ? WHERE id = ?",
    [data.loan, data.id],
    function (err) {
      if (err) {
        console.error("Error updating row:", err.message);
      } else {
        console.log(`Row with ID ${data.id} has been replaced.`);
      }
    }
  );

  db.run(
    `INSERT INTO loan(date,name,loanamount,interest) VALUES (?,?,?,?)`,
    [Date, data.name, data.loanamount, data.loan],
    (err) => {
      if (err) {
        console.log("Error updating data", err);
      } else {
        console.log(`add with ID ${data.name} has been replaced.`);
      }
    }
  );
  db.run(
    ` UPDATE BankInfo SET balance = balance - ? WHERE bankname = ?`,
    [data.loan, data.bank],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Balance subtracted");
      }
    }
  );

  db.run(
    ` INSERT INTO Log(date, name , ammount, bank,type)
  VALUES(?,?,?,?,?)`,
    [
      Date,
      `${data.name} withdrew on ${
        Date.slice(3, 5) + "/" + Date.slice(0, 2) + "/" + Date.slice(6, 10)
      } as a loan`,
      data.loan,
      data.bank,
      data.type === "withdrawal",
    ],
    (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err.message);
      } else {
        console.log("Log added");
      }
    }
  );
});
ipcMain.on("removemember", async (event, data) => {
  db.run("DELETE FROM MemberInfo WHERE id = ?", data.id, function (err) {
    if (err) {
      console.error("Error deleting row:", err.message);
    } else {
      console.log(`Row with ID ${data.id} has been deleted.`);
    }
  });
  db.run(
    "DELETE FROM RegisterLog WHERE username = ?",
    data.name,
    function (err) {
      if (err) {
        console.error("Error deleting row:", err.message);
      } else {
        console.log(`Row with ID ${data.id} has been deleted.`);
      }
    }
  );
});
ipcMain.on("editall", async (event, data) => {
  db.run(
    "UPDATE MemberInfo SET loan = ? , pendingmagalam = ? , fine = ?, totalsavings = ?, interest = ? , pendingsavings = ?  WHERE id = ?",
    [
      data.loan,
      data.magalam,
      data.fine,
      data.savings,
      data.interest,
      data.pendingsavings,
      data.id,
    ],
    function (err) {
      if (err) {
        console.error("Error updating row:", err.message);
      } else {
        console.log(`Row with ID ${data.id} has been replaced.`);
      }
    }
  );
});

ipcMain.on("expense", async (e, data) => {
  db.run(
    `INSERT INTO Expense(date, name, ammount,type) VALUES(?,?,?,?)`,
    [data.date, data.name, data.amount, data.type],
    (err) => {
      if (err) {
        console.log("Error updating data", err);
      } else {
        console.log(`add with ID ${data.name} has been replaced.`);
      }
    }
  );
  db.run(
    ` INSERT INTO Log(date, name , ammount, bank,type)
    VALUES(?,?,?,?,?)`,
    [
      data.date,
      data.name,
      data.amount,
      data.bank,
      data.type === "expense" ? "withdrawal" : "deposit ",
    ],
    (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err.message);
      } else {
        console.log("Log added");
      }
    }
  );
  db.run(
    ` UPDATE BankInfo SET balance = balance + ? WHERE bankname = ?`,
    [data.type === "expense" ? -1 * data.amount : data.amount, data.bank],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Balance Added");
      }
    }
  );
});
ipcMain.on("expenseDelete", async (e, data) => {
  db.run(`DELETE FROM Expense  WHERE id =?`, data.id, (err) => {
    if (err) {
      console.log("Error updating data", err);
    } else {
      console.log(` ID ${data.name} has been Deleted.`);
    }
  });
});

ipcMain.on("ExtraIncome", async (event, data) => {
  db.run(
    `INSERT INTO ExtraSavings(date, name, ammount) VALUES(?,?,?)`,
    [data.date, data.name, data.amount],
    (err) => {
      if (err) {
        console.log("Error updating data", err);
      } else {
        console.log(`add with ID ${data.name} has been replaced.`);
      }
    }
  );
});
ipcMain.on("ExtraDelete", async (e, data) => {
  db.run(`DELETE FROM ExtraSavings  WHERE id =?`, data.id, (err) => {
    if (err) {
      console.log("Error updating data", err);
    } else {
      console.log(` ID ${data.name} has been Deleted.`);
    }
  });
});

ipcMain.on("AddBank", (e, data) => {
  db.run(
    `INSERT INTO BankInfo(bankname, accountnumber, ifdccode, balance ) VALUES(?, ?, ?, ?)`,
    [data.bankname, data.accountnumber, data.ifsccode, 0],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Add new bank details");
      }
    }
  );
});
ipcMain.on("deleteBank", async (e, data) => {
  console.log(data);
  db.run(`DELETE FROM BankInfo  WHERE id =?`, data, (err) => {
    if (err) {
      console.log("Error updating data", err);
    } else {
      console.log(` ID ${data} has been Deleted.`);
    }
  });
});
ipcMain.on("editmetadata", (e, data) => {
  db.run(
    `UPDATE basicINfo SET savingsincrement = ?, magalamincrement = ? WHERE id = 1`,
    [data.savings, data.magalam],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Meta Data updated");
      }
    }
  );
});
ipcMain.on("backup", (e, data) => {
  copyData();
});

//Additional Loan section

ipcMain.on("add_additional_loan", (e, data) => {
  db.run(
    "UPDATE MemberInfo SET additionalloan = additionalloan + ? WHERE id = ?",
    [data.loan, data.id],
    function (err) {
      if (err) {
        console.error("Error updating row:", err.message);
      } else {
        console.log(`Row with ID ${data.id} has been replaced.`);
      }
    }
  );

  db.run(
    `INSERT INTO Additionalloan(date,name,amount) VALUES (?,?,?)`,
    [Date, data.name, data.loan],
    (err) => {
      if (err) {
        console.log("Error updating data", err);
      } else {
        console.log(`add with ID ${data.name} has been replaced.`);
      }
    }
  );
  db.run(
    ` UPDATE BankInfo SET balance = balance - ? WHERE bankname = ?`,
    [data.loan, data.bank],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Balance subtracted");
      }
    }
  );

  db.run(
    ` INSERT INTO Log(date, name , ammount, bank,type)
  VALUES(?,?,?,?,?)`,
    [
      Date,
      `${data.name} withdrew on ${
        Date.slice(3, 5) + "/" + Date.slice(0, 2) + "/" + Date.slice(6, 10)
      } as a loan`,
      data.loan,
      data.bank,
      data.type === "withdrawal",
    ],
    (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err.message);
      } else {
        console.log("Log added");
      }
    }
  );
});

// Payback additional loan section

ipcMain.on("payback_additional_loan", (e, data) => {
  db.run(`INSERT INTO AdditionalloanLog(date , name ,amount) VALUES(?,?,?)`, [
    data.date,
    data.name,
    data.amount,
  ]);
  db.run(
    "UPDATE MemberInfo SET additionalloan = additionalloan - ? WHERE id = ?",
    [data.amount, data.id],
    function (err) {
      if (err) {
        console.error("Error updating row:", err.message);
      } else {
        console.log(`Row with ID ${data.id} has been replaced.`);
      }
    }
  );
  db.run(
    ` UPDATE BankInfo SET balance = balance + ? WHERE bankname = ?`,
    [data.amount, data.bank],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Balance Added");
      }
    }
  );

  db.run(
    ` INSERT INTO Log(date, name , ammount, bank,type)
  VALUES(?,?,?,?,?)`,
    [
      Date,
      `${data.name} deposit on ${
        Date.slice(3, 5) + "/" + Date.slice(0, 2) + "/" + Date.slice(6, 10)
      } as a Additional loan payback`,
      data.amount,
      data.bank,
      data.type === "deposit",
    ],
    (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err.message);
      } else {
        console.log("Log added");
      }
    }
  );
});

// fine pay back section

ipcMain.on("fine_payback", (e, data) => {
  db.run(
    `INSERT INTO  Fine(date , name , amount) VALUES(?,?,?)`,
    [data.date, data.name, data.amount],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Fine payback log added");
      }
    }
  );
  db.run(
    `UPDATE MemberInfo SET fine = fine - ? WHERE id = ? `,
    [data.amount, data.id],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("User profile updated ");
      }
    }
  );
  db.run(
    ` UPDATE BankInfo SET balance = balance + ? WHERE bankname = ?`,
    [data.amount, data.bank],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Balance Added");
      }
    }
  );

  db.run(
    ` INSERT INTO Log(date, name , ammount, bank,type)
  VALUES(?,?,?,?,?)`,
    [
      Date,
      `${data.name} deposit on ${
        Date.slice(3, 5) + "/" + Date.slice(0, 2) + "/" + Date.slice(6, 10)
      } as a fine payback`,
      data.amount,
      data.bank,
      data.type === "deposit",
    ],
    (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err.message);
      } else {
        console.log("Log added");
      }
    }
  );
});
