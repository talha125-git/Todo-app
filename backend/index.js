import e from "express"
import { CollectionName, connection } from "./dbconfig.js";

const app = e();

app.use(e.json());

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
app.listen(3200)