const sqlite3 = require("sqlite3").verbose();
const path = require("path");

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
module.exports = db;
