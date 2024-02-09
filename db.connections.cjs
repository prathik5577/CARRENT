const {MongoClient} = require('mongodb')


let dbconnection
function connectToDb(callBack) {
    MongoClient.connect('mongodb+srv://sujith:12345@cluster0.8zbrz1a.mongodb.net/carrentdatabase?retryWrites=true&w=majority').then(function(client) {
        dbconnection = client.db()
        callBack()
    }).catch(function(error) {
        callBack(error)
    })
}

function getDb() {
    return dbconnection
}

// Exporting required functions
module.exports = {connectToDb, getDb}