import dotenv from 'dotenv'
dotenv.config()
import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL;
const dbName = "todo-Project";
let db = null;
const client = new MongoClient(url);

export const CollectionName = "todo_app";

export const connection = async () => {
    if (!db) {
        await client.connect();
        db = client.db(dbName);
        console.log("✅ MongoDB connected!");
    }
    return db;
}