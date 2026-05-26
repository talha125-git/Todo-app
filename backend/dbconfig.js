import dotenv from 'dotenv'
dotenv.config()
import { MongoClient } from "mongodb";
import dns from 'dns';

const url = process.env.MONGO_URL;
const dbName = "todo-Project";
let db = null;
let client = new MongoClient(url);

export const CollectionName = "todo_app";

export const connection = async () => {
    if (!db) {
        try {
            await client.connect();
            db = client.db(dbName);
            console.log("✅ MongoDB connected!");
        } catch (err) {
            console.error("⚠️ MongoDB connection failed. Checking for DNS issues...", err);
            
            // Check if it is a DNS resolution/connection failure
            const isDnsError = err.message && (
                err.message.includes('querySrv') || 
                err.message.includes('ECONNREFUSED') || 
                err.message.includes('ENOTFOUND') ||
                err.message.includes('dns')
            );

            if (isDnsError && typeof dns.setServers === 'function') {
                try {
                    console.log("ℹ️ DNS resolution issue detected. Setting DNS to Google servers (8.8.8.8, 8.8.4.4) and retrying...");
                    dns.setServers(['8.8.8.8', '8.8.4.4']);
                    
                    // Create a new client since the previous client might be in an unusable/failed state
                    client = new MongoClient(url);
                    await client.connect();
                    db = client.db(dbName);
                    console.log("✅ MongoDB connected with fallback DNS!");
                } catch (fallbackErr) {
                    console.error("❌ MongoDB connection failed even with fallback DNS:", fallbackErr);
                    throw fallbackErr;
                }
            } else {
                throw err;
            }
        }
    }
    return db;
}