import 'dotenv/config'
import e from "express"
import cors from 'cors'
import { CollectionName, connection } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

const app = e();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(e.json());
app.use(cookieParser());

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ],
    credentials: true
}))

// Sign UP
app.post("/signup", async (req, resp) => {
    const userData = req.body;

    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('user');

        const existing = await collection.findOne({ email: userData.email });
        if (existing) {
            return resp.send({ success: false, msg: 'Email already registered' });
        }

        const result = await collection.insertOne(userData)

        if (result) {
            jwt.sign(userData, JWT_SECRET, { expiresIn: '5d' }, (error, token) => {
                resp.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 5 * 24 * 60 * 60 * 1000
                })
                resp.send({ success: true, msg: 'Signup done', token })
            })
        } else {
            resp.send({ success: false, msg: 'Signup failed' })
        }

    } else {
        resp.send({ success: false, msg: 'Email and password required' })
    }
})

// Login
app.post("/login", async (req, resp) => {
    const userData = req.body;

    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('user');
        const result = await collection.findOne({ email: userData.email, password: userData.password })

        if (result) {
            jwt.sign(userData, JWT_SECRET, { expiresIn: '5d' }, (error, token) => {
                resp.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 5 * 24 * 60 * 60 * 1000
                })
                resp.send({
                    success: true,
                    msg: 'Login done',
                    token,
                    userName: result.name  // ✅ send name from DB
                })
            })
        }  else {
            resp.send({ success: false, msg: 'Invalid email or password' })
        }
    } else {
        resp.send({ success: false, msg: 'Email and password required' })
    }
})

app.post("/add-task", verify_JWT_Token, async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(CollectionName)
    const taskData = {
        ...req.body,
        userEmail: req.user.email  // ✅ save which user owns this task
    }
    const result = await collection.insertOne(taskData)
    if (result) {
        resp.send({ message: "new task added", success: true, result })
    } else {
        resp.send({ message: "task not added", success: false })
    }
})

app.get("/tasks", verify_JWT_Token, async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(CollectionName)
    const result = await collection.find({ userEmail: req.user.email }).toArray() // ✅ filter by user
    if (result) {
        resp.send({ message: "task list fetched", success: true, result })
    } else {
        resp.send({ message: "error try again after sometime", success: false })
    }
})

app.get("/task/:id", verify_JWT_Token, async (req, resp) => {
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

app.put("/update-task/:id", verify_JWT_Token, async (req, resp) => {
    const db = await connection();
    const id = req.params.id
    const { title, description } = req.body
    const collection = await db.collection(CollectionName)
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, description } }
    )
    if (result.modifiedCount > 0) {
        resp.send({ message: "task updated", success: true })
    } else {
        resp.send({ message: "task not updated", success: false })
    }
})

app.delete("/delete/:id", verify_JWT_Token, async (req, resp) => {
    const db = await connection();
    const id = req.params.id
    const collection = await db.collection(CollectionName)
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    if (result) {
        resp.send({ message: "task deleted", success: true, result })
    } else {
        resp.send({ message: "error try again after sometime", success: false })
    }
})

app.delete("/delete-multiple", verify_JWT_Token, async (req, resp) => {
    const db = await connection();
    const ids = req.body;
    const deleteTaskIds = ids.map((item) => new ObjectId(item))
    const collection = await db.collection(CollectionName)
    const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } })
    if (result) {
        resp.send({ message: "tasks deleted", success: result })
    } else {
        resp.send({ message: "error try again after sometime", success: false })
    }
})

function verify_JWT_Token(req, resp, next) {
    const token = req.cookies['token'] || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return resp.send({ msg: "No token provided", success: false });
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return resp.send({ msg: "Invalid token", success: false });
        }
        req.user = decoded;
        next();
    });
}

app.listen(3200, () => {
    console.log('✅ Backend server running on http://localhost:3200');
})