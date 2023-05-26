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


exports = ({ token, tokenId, username, password, currentPasswordValid }) => {
  // check if the username corresponds to a real user
  const isUser = myCustomValidator.validate(username);
  // check if the user is attempting to reset their password to their current password
  if (currentPasswordValid) {
    myCustomNotifier.sendMessage(username, "Cannot reset password to current password.");
    return { status: 'fail' };
  }
  // check if the user has requested a password reset too often recently
  const isNotCoolingDown = myCustomCooldownService.canReset(username, 'myCustomService')
  // send a message to the user in some way so that the user can confirm themselves
  const msgSendSuccessful = isUser && isNotCoolingDown && myCustomMsgr.send(username, token, tokenId)
  if ( msgSendSuccessful ) {
     return { status: 'pending' };
  } else {
     return { status: 'fail' };
  }
}

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