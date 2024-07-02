const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const db = new sqlite3.Database("DataBase.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the database DataBase.db.");
  }
});

db.run(`CREATE TABLE IF NOT EXISTS RegisterLog (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  username TEXT,
  savings REAL,
  loan REAL,
  magalam REAL,
  fine REAL,
  interest REAL,
  gave REAL,
  attendence  INTEGER -- Use INTEGER instead of BOOLEAN
)`);
db.run(`CREATE TABLE IF NOT EXISTS MemberInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phoneNumber REAL,
  address TEXT,
  loan REAL DEFAULT 0,
  fine REAl DEFAULT 0,
  interest REAL DEFAULT 0 ,
  totalsavings REAL DEFAULT 0, 
  pendingsavings REAl DEFAULT 0,
  pendingmagalam REAL DEFAULT 0,
  date TEXT

)`);

db.run(`CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  asset REAL DEFAULT 0,
  loan REAL DEFAULT 0,
  fine REAL DEFAULT 0,
  magalam REAL DEFAULT 0,
  interest REAL DEFAULT 0

)`);
db.run(`CREATE TABLE IF NOT EXISTS loan (
  id INTEGER PRIMARY KEY AUTOINCREMENT  ,
  date TEXT,
  name TEXT ,
  interest REAL,
  loanamount REAL 
)`);

db.run(`CREATE TABLE IF NOT EXISTS Log(
  id INTEGER PRIMARY KEY AUTOINCREMENT  ,
  date TEXT,
  name TEXT,
  bank TEXT,
  ammount REAL,
  type TEXT
)`);
db.run(`CREATE TABLE IF NOT EXISTS Expense(
  id INTEGER PRIMARY KEY AUTOINCREMENT  ,
  date TEXT,
  name TEXT,
  ammount REAL,
  type TEXT
)`);
db.run(`CREATE TABLE IF NOT EXISTS ExtraSavings(
  id INTEGER PRIMARY KEY AUTOINCREMENT  ,
  date TEXT,
  name TEXT,
  ammount REAL
)`);
db.run(`CREATE TABLE IF NOT EXISTS temp(
  id INTEGER PRIMARY KEY AUTOINCREMENT ,
  text TEXT
)`);
db.run(`CREATE TABLE IF NOT EXISTS BankInfo    
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bankname TEXT,
  accountnumber TEXT,
  ifdccode TEXT,
  balance REAL DEFAULT 0

)`);
db.run(`CREATE TABLE IF NOT EXISTS basicINfo(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  savingsincrement REAL ,
  magalamincrement REAL
)`);
db.run(`CREATE TABLE IF NOT EXISTS Additionalloan(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  name TEXT,
  amount REAL,
  pendingamount REAL
)`);
db.run(`CREATE TABLE IF NOT EXISTS AdditionalloanLog(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  name TEXT,
  amount REAL
)`);
db.run(`CREATE TABLE IF NOT EXISTS Fine(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  name TEXT,
  amount REAL
)`);

const initDb = () => {
  const schema = `CREATE TABLE IF NOT EXISTS Updated_RegisterLog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS Updated_Insert_RegisterLog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS register_log_updated_id
AFTER UPDATE ON RegisterLog
BEGIN
    INSERT INTO Updated_RegisterLog (updated_id) VALUES (NEW.id);
END;

CREATE TRIGGER IF NOT EXISTS register_log_insert_ids
AFTER INSERT ON RegisterLog
BEGIN
    INSERT INTO Updated_Insert_RegisterLog (updated_id) VALUES (NEW.id);
END;

CREATE TABLE IF NOT EXISTS Updated_Accounts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS accounts_insert_id
AFTER INSERT ON Accounts
BEGIN
    INSERT INTO Updated_Accounts (updated_id) VALUES (NEW.id);
END;

CREATE TABLE IF NOT EXISTS Updated_Additionalloan(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS Additionalloan_insert_id
AFTER INSERT ON Additionalloan
BEGIN
    INSERT INTO Updated_Additionalloan (updated_id) VALUES (NEW.id);
END;

CREATE TABLE IF NOT EXISTS Updated_Addtionalloanlog(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS Addtionalloanlog_insert_id
AFTER INSERT ON AdditionalloanLog
BEGIN
    INSERT INTO Updated_Addtionalloanlog (updated_id) VALUES (NEW.id);
END;

CREATE TABLE IF NOT EXISTS Updated_Expense(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS Expense_insert_id
AFTER INSERT ON Expense
BEGIN
    INSERT INTO Updated_Expense (updated_id) VALUES (NEW.id);
END;


CREATE TABLE IF NOT EXISTS Updated_ExtraSavings(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS ExtraSavings_insert_id
AFTER INSERT ON ExtraSavings
BEGIN
    INSERT INTO Updated_ExtraSavings (updated_id) VALUES (NEW.id);
END;

CREATE TABLE IF NOT EXISTS Updated_Fine(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS Fine_insert_id
AFTER INSERT ON Fine
BEGIN
    INSERT INTO Updated_Fine (updated_id) VALUES (NEW.id);
END;

CREATE TABLE IF NOT EXISTS Updated_loan(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS loan_insert_id
AFTER INSERT ON loan
BEGIN
    INSERT INTO Updated_loan (updated_id) VALUES (NEW.id);
END;

CREATE TABLE IF NOT EXISTS Updated_Log(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_id INTEGER,
    updated_timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS Log_insert_id
AFTER INSERT ON Log
BEGIN
    INSERT INTO Updated_Log (updated_id) VALUES (NEW.id);
END;

`;

  db.serialize(() => {
    db.exec(schema, (err) => {
      if (err) {
        console.error("Error executing schema:", err.message);
      } else {
        console.log("SQLite schema created successfully.");
      }
    });
  });
};
initDb();

module.exports = db;
