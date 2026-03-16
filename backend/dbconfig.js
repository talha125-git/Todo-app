import { MongoClient } from "mongodb";

const url = "mongodb+srv://abutalhaa844_db_user:todo12345@cluster0.2w82hzp.mongodb.net/?appName=Cluster0";
const dbName = "todo-Project";
const client = new MongoClient(url);
export const  CollectionName = "todo_app"; 

export const connection = async () => {
   
    const connect = await client.connect();
    return await connect.db(dbName) 
}