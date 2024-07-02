const { MongoClient } = require("mongodb");
const sqlite3 = require("sqlite3");

// Connect to SQLite database
const sqliteDB = new sqlite3.Database("./DataBase.db");

// Connect to MongoDB
const mongoURI =
  "mongodb+srv://abhinavshyjupc:RVzNRxgAImI5MsO8@cluster0.pk5qken.mongodb.net/"; // Your MongoDB URI
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true, // Remove this line
  useUnifiedTopology: true, // Remove this line
});

const copyData = async () => {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("backup"); // Change to your MongoDB database name

    // Define MongoDB collections
    const RegisterLogCollection = db.collection("RegisterLog");
    const MemberInfoCollection = db.collection("MemberInfo");
    const AccountsCollection = db.collection("Accounts");
    const LoanCollection = db.collection("Loan");
    const LogCollection = db.collection("Log");
    const ExpenseCollection = db.collection("Expense");
    const ExtraSavingsCollection = db.collection("ExtraSavings");
    const TempCollection = db.collection("Temp");
    const BankInfoCollection = db.collection("BankInfo");
    const BasicInfoCollection = db.collection("BasicInfo");
    const AdditionalloanCollection = db.collection("Additionaloan");
    const AdditionalloanlogCollection = db.collection("Additionaloanlog");
    const FineCollection = db.collection("Fine");

    await copyCollectionData(sqliteDB, "MemberInfo", MemberInfoCollection);
    await copyCollectionData(sqliteDB, "BankInfo", BankInfoCollection);

    await synccollections(
      sqliteDB,
      "RegisterLog",
      "Updated_Insert_RegisterLog",
      RegisterLogCollection
    );
    await synccollections_when_update(
      sqliteDB,
      "RegisterLog",
      "Updated_Insert_RegisterLog",
      RegisterLogCollection
    );
    await synccollections(
      sqliteDB,
      "Accounts",
      "Updated_Accounts",
      AccountsCollection
    );
    await synccollections(
      sqliteDB,
      "Additionalloan",
      "Updated_Additionalloan",
      AdditionalloanCollection
    );
    await synccollections(
      sqliteDB,
      "AdditionalloanLog",
      "Updated_Addtionalloanlog",
      AdditionalloanlogCollection
    );
    await synccollections(
      sqliteDB,
      "Expense",
      "Updated_Expense",
      ExpenseCollection
    );
    await synccollections(sqliteDB, "Fine", "Updated_Fine", FineCollection);
    await synccollections(sqliteDB, "loan", "Updated_loan", LoanCollection);
    await synccollections(sqliteDB, "Log", "Updated_Log", LogCollection);

    await synccollections(
      sqliteDB,
      "ExtraSavings",
      "Updated_ExtraSavings",
      ExtraSavingsCollection
    );

    console.log("Data copied to MongoDB successfully.");
    return 1;
  } catch (error) {
    console.error("Error copying data:", error);
    return 0;
  } finally {
    // Close connections
    // await client.close();
    // sqliteDB.close();
    // return 1;
  }
};

const synccollections = async (
  sqlDB,
  data_table,
  updated_info_table,
  mdb_collection
) => {
  try {
    const updatedIdsQuery = `SELECT updated_id FROM ${updated_info_table}`;
    const updatedIds = await new Promise((resolve, reject) => {
      sqlDB.all(updatedIdsQuery, (err, rows) => {
        if (err) {
          console.error("Error fetching updated_ids:", err);
          reject(err);
        } else {
          resolve(rows.map((row) => row.updated_id));
        }
      });
    });
    // if (updatedIds.length === 0) {
    //   return;
    // }
    const fetchDataQuery = `SELECT * FROM ${data_table} WHERE id IN (${updatedIds.join(
      ","
    )})`;
    const rows = await new Promise((resolve, reject) => {
      sqlDB.all(fetchDataQuery, (err, rows) => {
        if (err) {
          console.error("Error fetching data from data_table:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    if (rows.length !== 0) {
      await mdb_collection.insertMany(rows);
      sqlDB.run(`delete from ${updated_info_table}`, (err) => {
        if (err) {
          console.error("Error deleting updated_info_table:", err);
        }
        console.log("Table deleted sucessfully.");
      });
    } else {
      console.log("No data to update");
    }
    console.log(`Data copied from ${data_table} to MongoDB.`);
  } catch (err) {
    console.error("Error synchronizing collections:", err);
    throw err;
  }
};
const synccollections_when_update = async (
  sqlDB,
  data_table,
  updated_info_table,
  mdb_collection
) => {
  try {
    const updatedIdsQuery = `SELECT updated_id FROM ${updated_info_table}`;
    const updatedIdsResult = await new Promise((resolve, reject) => {
      sqlDB.all(updatedIdsQuery, (err, rows) => {
        if (err) {
          console.error("Error fetching updated_ids:", err);
          reject(err);
        } else {
          const updatedIds = rows.map((row) => row.updated_id);
          // if (updatedIds.length === 0) {
          //   return;
          // }
          resolve(updatedIds);
        }
      });
    });

    const fetchDataQuery = `SELECT * FROM ${data_table} WHERE id IN (${updatedIdsResult.join(
      ","
    )})`;
    const rows = await new Promise((resolve, reject) => {
      sqlDB.all(fetchDataQuery, (err, rows) => {
        if (err) {
          console.error("Error fetching data from data_table:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const updateOperations = rows.map((row) => ({
      updateOne: {
        filter: { id: row.id },
        update: { $set: row },
        upsert: true,
      },
    }));
    if (updateOperations.length !== 0) {
      await mdb_collection.bulkWrite(updateOperations);
      sqlDB.run(`DELETE FROM ${updated_info_table}`, (err) => {
        if (err) {
          console.error("Error deleting data from updated_info_table:", err);
        } else {
          console.log(`Deleted data from ${updated_info_table} in SQLite.`);
        }
      });

      console.log(`Data synchronized from ${data_table} to MongoDB.`);
    } else {
      console.log("No new data to sync.");
    }
  } catch (err) {
    console.error("Error synchronizing collections:", err);
    throw err;
  }
};

const copyCollectionData = async (sqlDB, table_name, collection) => {
  try {
    sqlDB.all(`SELECT * FROM ${table_name}`, async (err, rows) => {
      if (err) {
        console.error("Error fetching data from SQLite:", err);
        return;
      }

      try {
        if (rows.length !== 0) {
          await collection.deleteMany({});

          await collection.insertMany(rows);

          console.log(`Data copied from ${table_name} to MongoDB collection.`);
        } else {
          console.log("No data to copy from SQLite to MongoDB.");
        }
      } catch (err) {
        console.error("Error copying data to MongoDB:", err);
      }
    });
  } catch (err) {
    console.error("Error copying data from SQLite to MongoDB:", err);
  }
};

// copyData();
module.exports = { copyData };
