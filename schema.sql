CREATE TABLE IF NOT EXISTS Updated_RegisterLog (
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

