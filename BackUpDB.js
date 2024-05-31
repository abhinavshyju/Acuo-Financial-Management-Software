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

    // Check if tables are empty before copying data
    await copyCollectionData(sqliteDB, "RegisterLog", RegisterLogCollection);
    await copyCollectionData(sqliteDB, "MemberInfo", MemberInfoCollection);
    await copyCollectionData(sqliteDB, "Accounts", AccountsCollection);
    await copyCollectionData(sqliteDB, "Loan", LoanCollection);
    await copyCollectionData(sqliteDB, "Log", LogCollection);
    await copyCollectionData(sqliteDB, "Expense", ExpenseCollection);
    await copyCollectionData(sqliteDB, "ExtraSavings", ExtraSavingsCollection);
    await copyCollectionData(sqliteDB, "Temp", TempCollection);
    await copyCollectionData(sqliteDB, "BankInfo", BankInfoCollection);
    await copyCollectionData(sqliteDB, "BasicInfo", BasicInfoCollection);

    console.log("Data copied to MongoDB successfully.");
  } catch (error) {
    console.error("Error copying data:", error);
  } finally {
    // Close connections
    await client.close();
    sqliteDB.close();
  }
};

// Function to copy data from SQLite to MongoDB for a given collection
async function copyCollectionData(sqliteDB, tableName, mongoCollection) {
  return new Promise((resolve, reject) => {
    const countQuery = `SELECT COUNT(*) AS count FROM ${tableName}`;
    sqliteDB.get(countQuery, (err, row) => {
      if (err) {
        console.error(`Error querying ${tableName} table:`, err);
        reject(err);
      } else {
        const rowCount = row.count;
        if (rowCount === 0) {
          console.log(
            `Skipping copying data from ${tableName} as it is empty.`
          );
          resolve();
        } else {
          const selectQuery = `SELECT * FROM ${tableName}`;
          sqliteDB.all(selectQuery, (err, rows) => {
            if (err) {
              console.error(`Error querying ${tableName} table:`, err);
              reject(err);
            } else {
              // Insert rows into MongoDB collection
              mongoCollection
                .insertMany(rows)
                .then(() => {
                  console.log(`Data copied from ${tableName} to MongoDB.`);
                  resolve();
                })
                .catch((err) => {
                  console.error(
                    `Error inserting data into ${tableName} collection:`,
                    err
                  );
                  reject(err);
                });
            }
          });
        }
      }
    });
  });
}

module.exports = { copyData };
