const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'donorDB';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB', err);
        return;
    }
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Endpoints
    app.post('/register', (req, res) => {
        const donor = req.body;
        db.collection('donors').insertOne(donor, (err, result) => {
            if (err) {
                res.status(500).send('Error registering donor');
                return;
            }
            res.status(200).send('Donor registered successfully');
        });
    });

    app.get('/donors', (req, res) => {
        db.collection('donors').find({}).toArray((err, donors) => {
            if (err) {
                res.status(500).send('Error fetching donors');
                return;
            }
            res.status(200).json(donors);
        });
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});