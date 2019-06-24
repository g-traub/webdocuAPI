/* 
Import
*/
const MongoClient = require('mongodb').MongoClient;
//

/* 
Config MongoDB
*/
const user = 'user';
const pswd  = 'user';

// Connection
const uri = `mongodb+srv://${user}:${pswd}@cluster0-yiyf6.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

const mongoConnect = () => {
  return new Promise( (resolve, reject) => {
      client.connect()
      .then( db => resolve( { db: db, url: uri } ))
      .catch( error => reject(`MongoDB not connected`, error) )
  })
}

/*
Export
*/
module.exports = {
  client,
  mongoConnect
}
//