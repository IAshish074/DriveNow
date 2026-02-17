require('dotenv').config()
const express = require("express")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT
const cors = require("cors")
const connectDb = require('./config/db')
const userRouter = require('./routes/userRoutes')
const ownerRouter = require('./routes/ownerRouter')
const app  = express()

app.use(cors())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
res.send("server is running")
})
app.use('/api/user',userRouter)
app.use("/api/owner",ownerRouter)
app.listen(PORT,()=>{
    connectDb()
    console.log(`server started http://localhost:${PORT}`)
})
