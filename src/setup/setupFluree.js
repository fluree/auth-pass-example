const axios = require("axios");

const schema = require("./dbSetup.json");
const data = require("./bookData.json");

require('dotenv').config();
const port = process.env.REACT_APP_FLUREE_PORT || 8080
const flureeUrl =  `http://localhost:${port}`;
const dbName = "example/comics";

/*
Steps for creating / seeding example database:
  1. Create new db (example/comics) via API call
  2. Add customer / employee subjects to _role collection
  3. Add comic collection, and subsequent predicates
  4. Add pull_list predicate to _user collection, restrict to comic collection
  5. Retrieve and add comic data to database.
  6. Profit
*/

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

async function newDatabase(name, dbUrl) {
  try {
    const db = await axios.post(`${dbUrl}/fdb/new-db`, {
      "db/id": name,
    });
    if (db.status === 200) {
      console.log("Database created");
      return true;
    }
    // console.log(res.message);
    return false;
  } catch (err) {
    console.log("Database not created");
    return false;
  }
}

async function createSchema(transactions, dbUrl, dbName) {
  try {
    const sendSchema = await axios.post(
      `${dbUrl}/fdb/${dbName}/transact`,
      transactions
    );
    if (sendSchema.status === 200) {
      console.log("Schema transacted!");
      return true;
    } else {
      console.log("Schema not transacted");
      console.log(sendSchema.message);
      return false;
    }
  } catch (err) {
    console.log(err);
    console.log("Transaction failed");
    return false;
  }
}

async function seedData(transaction, dbUrl, dbName) {
  try {
    const sendData = await axios.post(
      `${dbUrl}/fdb/${dbName}/transact`,
      transaction
    );
    if (sendData.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function setupFluree() {
  newDatabase(dbName, flureeUrl)
    .then(() => delay(3000))
    .then(() => createSchema(schema, flureeUrl, dbName))
    .then(() => seedData(data, flureeUrl, dbName))
    .catch(() => console.log("something went wrong"));
}

export default setupFluree;