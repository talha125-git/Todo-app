import e from "express"

const app = e();

app.get("/",(req,resp)=>{
    resp.send({
        message:"basic api",
        success:true
    })
})
app.listen(3200)