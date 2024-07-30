const { MongoClient } = require('mongodb');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

let connection;

let uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_ROOT_HOST}/`;

console.log(uri);

async function createDataBase(callBack) {
  let users = await connection.listCollections({}, { nameOnly: true }).toArray();
  users = users.filter((collectionName) => {
    return collectionName.name === "users";
  });
  // if users not exist
  if (users.length === 0) {
    let usersCollection = await connection.createCollection("users");

    const filePath = "./data.json";
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    await usersCollection.insertMany(jsonData);
  }
  return callBack();
}

module.exports = {
  connectToDb: (callBack) => {
    MongoClient.connect(uri)
      .then((client) => {
        connection = client.db();
        console.log("start connection with database");
        // create users from data.json
        // createDataBase(callBack);
        return callBack();
      })
      .catch(err => {
        console.log(err);
        return callBack(err);
      });
  },
  getDb: () => {
    return connection;
  }
}


