const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        // error handling
        if (err) throw err;

        console.log('Connected to Database');

        // db
        const db = client.db('fewoApp');
        
        // get all items
        app.get('/', (req, res) => {
            db.collection('fewo').find().toArray()
            .then(results => {
                res.send(results);

            })
            .catch(error => console.error(error))
        })

        // get all items by landlord
        app.get('/landlords/:landlord', (req, res) => {
            db.collection('fewo').find({ 'Landlord.Name': req.params.landlord}).toArray()
            .then(results => {
                res.send(results);
            })
            .catch(error => console.error(error))
        })

        // get specific item by property name
        app.get('/property/:property', (req, res) => {
            db.collection('fewo').find({ 'Property.Name': req.params.property}).toArray()
            .then(fewo => {
                res.send(fewo);
            })
            .catch(error => console.error(error))
        })
});

// server port
app.listen(3000, () => {
    console.log('listening on port 3000');
});