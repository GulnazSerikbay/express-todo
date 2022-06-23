import express, { request } from "express";
import bodyParser from "body-parser";
import { connect, getDB } from "./db.js";
import { ObjectId } from "mongodb";
import "dotenv/config";


const app = express();
const port = process.env.port || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connect();

app.get('/', (req, res) => {
    res.status(200).send();
});

app.get('/todos', (req, res) => {
    const {label} = req.query
    console.log(label)
    getDB()
    .collection('tasks')
.find({'label': {$regex: label}})
    .sort("priority")
    .toArray((err, result) => {
        if (err) {
            res.status(500).json({ err: err });
            return;
        }
        res.status(200).json(result);
    });
});

app.post('/todos', (req, res) => {
    const {label, completed, priority} = req.body;

    getDB()
    .collection('tasks')
    .insertOne({
        'label': label, 
        'completed': completed,
        priority
    }, (err) => {
        if (err) {
            res.status(500).json({ err: err });
            return;   
        }
        console.log(`Successfully added your todo!`)

        res.status(200).send();
    });
});

app.put('/todos/:id', (req, res) => {
    const {label, completed, priority} = req.body;

    getDB()
    .collection('tasks')
    .updateOne(
    {  _id: new ObjectId(req.params.id) },
    {
        $set: {
            label, 
            completed,
            priority
        }
    }, (err) => {
        if (err) {
            res.status(500).json({ err: err });
            return;   
        }
        console.log(`Successfully updated ${req.params.id}`)
        res.status(200).send();
    });
});


app.delete('/todos/:id', (req, res) => {
    
    getDB()
    .collection('tasks')
    .deleteOne({ _id: new ObjectId(req.params.id) }, (err) => {
        if (err) {
            res.status(500).json({ err: err });
            return;   
        }
        console.log(`Successfully deleted ${req.params.id}`)
        res.status(200).send();
    });
});

app.listen(port, () => {
    console.log('Server started!');
});

            /* Notes */
//  install insomnia
//  database->collections->documents
// query???? req.query? 
