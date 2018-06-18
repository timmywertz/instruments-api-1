/*
client --> | --> instruments-api --> dal --> | --> couchdb
*/

require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))

const db = new PouchDB(
  `${process.env.COUCH_HOSTNAME}${process.env.COUCH_DBNAME}`
)

const getInstrument = (id, callback) => db.get(id, callback)

///////////////////////////
////  HELPER FUNCTIONS ////
///////////////////////////
/*
function getDoc(id, callback) {
  db.get(id, callback)
}
*/

const dal = {
  getInstrument: getInstrument
}

module.exports = dal
