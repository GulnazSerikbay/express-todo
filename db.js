import { MongoClient as mongo } from "mongodb";
import "dotenv/config";

const url = process.env.url || "mongodb://localhost:27017";
let db;

const connect = () => {
    mongo.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, client) => {
            if (err) {
                console.error(err);
                return;
            }
            db = client.db("todos");
        }
    )
}

const getDB = () => db;

export { connect, getDB };
