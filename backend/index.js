import e from "express"
import cors from 'cors'
import { CollectionName, connection } from "./dbconfig.js";

const app = e();

app.use(e.json());
app.use(cors());

app.post("/add-task", async (req,resp)=>{
    const db = await connection();
    const collection = await db.collection(CollectionName)
    const result = await collection.insertOne(req.body)
    if (result) {
        resp.send({message:"new task added",success:true,result})
    }else{
         resp.send({message:"task not  added",success:false})
    }    
})

app.get("/tasks", async (req,resp)=>{
    const db = await connection();
    const collection = await db.collection(CollectionName)
    const result = await collection.find().toArray()
    if (result) {
        resp.send({message:"task list fetched",success:true,result})
    }else{
         resp.send({message:"error try again after sametime",success:false})
    }    
})


app.listen(3200)