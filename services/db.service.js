/* 
Import
*/
const MongoClient = require('mongodb').MongoClient;
//

/* 
Config MongoDB
*/
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'webdocuAPI';
const client = new MongoClient(url, { useNewUrlParser: true });

const mongoConnect = () => {
  return new Promise( (resolve, reject) => {
      client.connect()
      .then( db => resolve( { db: db, url: url } ))
      .catch( error => reject(`MongoDB not connected`, error) )
  })
}

/*
Export
*/
module.exports = mongoConnect;
//