import { MongoClient } from "mongodb";

const url = "mongodb+srv://abutalhaa844_db_user:todo12345@cluster0.2w82hzp.mongodb.net/?appName=Cluster0";
const dbName = "todo-Project";

let db = null;  // ✅ reuse connection instead of reconnecting every request

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