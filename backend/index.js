import e from "express"
import cors from 'cors'
import { CollectionName, connection } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';

const app = e();

app.use(e.json());
app.use(cors());


app.post("/signup", async (req, resp) => {
    const userData = req.body;

    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('user');
        const result = await collection.insertOne(userData)

        if (result) {
            jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
                resp.send({
                    success: true,
                    msg: 'Signup done',
                    token
                })
            })
        }

    } else {
        resp.send({
            success: false,
            msg: 'Signup failed',
            token
        })
    }



})

app.post("/add-task", async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(CollectionName)
    const result = await collection.insertOne(req.body)
    if (result) {
        resp.send({ message: "new task added", success: true, result })
    } else {
        resp.send({ message: "task not  added", success: false })
    }
})

app.get("/tasks", async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(CollectionName)
    const result = await collection.find().toArray()
    if (result) {
        resp.send({ message: "task list fetched", success: true, result })
    } else {
        resp.send({ message: "error try again after sametime", success: false })
    }
})

// ✅ fixed: changed /tasks/:id to /task/:id (matches frontend fetch)
app.get("/task/:id", async (req, resp) => {
    const db = await connection();
    const id = req.params.id
    const collection = await db.collection(CollectionName)
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (result) {
        resp.send({ message: "task fetched", success: true, result })
    } else {
        resp.send({ message: "task not found", success: false })
    }
})

// ✅ new: PUT route to update task by id
app.put("/update-task/:id", async (req, resp) => {
    const db = await connection();
    const id = req.params.id
    const { title, description } = req.body // get updated fields from request body
    const collection = await db.collection(CollectionName)
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },        // find task by id
        { $set: { title, description } }  // update only title and description
    )
    if (result.modifiedCount > 0) {
        resp.send({ message: "task updated", success: true })
    } else {
        resp.send({ message: "task not updated", success: false })
    }
})

app.delete("/delete/:id", async (req, resp) => {
    const db = await connection();
    const id = req.params.id
    const collection = await db.collection(CollectionName)
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    if (result) {
        resp.send({ message: "task deleted", success: true, result })
    } else {
        resp.send({ message: "error try again after sametime", success: false })
    }
})

app.delete("/delete-multiple", async (req, resp) => {
    const db = await connection();
    const ids = req.body;
    const deleteTaskIds = ids.map((item) => new ObjectId(item))
    console.log(ids);

    const collection = await db.collection(CollectionName)
    const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } })
    if (result) {
        resp.send({ message: "task deleted", success: result })
    } else {
        resp.send({ message: "error try again after sametime", success: false })
    }
})


app.listen(3200)