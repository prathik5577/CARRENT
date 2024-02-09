const express = require('express')
const bodyParser = require('body-parser')



const {ObjectId} = require('mongodb')


// Importing required functions from dbConnection.cjs
const {connectToDb, getDb} = require('./db.connections.cjs')

const app = express()
app.use(bodyParser.json())

let db
connectToDb(function(error) {
    if(error) {
        console.log('Could not establish connection...')
        console.log(error)
    } else {
        const port = process.env.PORT || 8000
        app.listen(port)
        db = getDb()
        console.log(`Listening on port ${port}...`)
    }
})

/**
 * Expense Tracker
 * Functionalities : adding entry, getting the summaries of previous entries, editing and deleting
 * Input fields : Category, Amount, Date
 * 
 * CRUD : Create, Read, Update and Delete
 * 
 * get-entries / get-data - GET
 * add-entry - POST
 * edit-entry - PATCH
 * delete-entry - DELETE
 */

// app.get('/', function(request, response) {
//     response.json({
//         "status" : "Welcome ;)"
//     })
// })




//add the data


app.post('/add-entry', function(request, response) {
    db.collection('CAR RENT').insertOne(request.body).then(function() {
        response.status(201).json({
            "status" : "Entry added successfully"
        })
    }).catch(function () {
        response.status(500).json({
            "status" : "Entry not added"
        })
    })
})




//add the data inside the dataset

app.get('/get-entries', function(request, response) {
    const entries = []
    db.collection('CAR RENT')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function() {
        response.status(500).json({
            "status" : "Could not fetch documents"
        })
    })
})




//delete the data

app.delete('/delete-entry/:id ', function(request, response) {
    if(ObjectId.isValid(request.query.id)) {
        db.collection('CAR RENT').deleteOne({
            _id : new ObjectId(request.query.id)
        }).then(function() {
            response.status(200).json({
                "status" : "Entry successfully deleted"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Entry not deleted"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})



//update the data

app.patch('/update-entry/:id', function(request, response) {
    if(ObjectId.isValid(request.params.id)) {
        db.collection('CAR RENT').updateOne(
            { _id : new ObjectId(request.params.id) },
            { $set : request.body } 
        ).then(function() {
            response.status(200).json({
                "status" : "Entry updated successfully"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Unsuccessful on updating the entry"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})
