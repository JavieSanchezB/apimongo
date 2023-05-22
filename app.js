const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "URL";
const client = new MongoClient(url);

// Database Name
const dbName = 'DBMONGO';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('usuarios');


const insertResult = await collection.insertMany([{ id: 1, nombres:"Jose" ,apellidos:"Mejia Bolaños" }, { id: 2 }, { id: 3 }]);
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