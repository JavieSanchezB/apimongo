const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'
require("dotenv").config();
const URI = process.env.URL_API_MONGO;

// Connection URL
const url = URI;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DBNAME;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('usuarios');


const insertResult = await collection.insertMany([{ id: 1, nombres:"Jose" ,apellidos:"Mejia Bolaños", Rol:"Contador" }, { id: 2, nombres:"Fabian" ,apellidos:"Jimenez", Rol:"Administrador" }, { id: 3, nombres:"Fabian" ,apellidos:"Jimenez", Rol:"Caja"}]);
console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());