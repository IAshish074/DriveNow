require('dotenv').config()
const express = require("express")
const PORT = process.env.port
const cors = require("cors")
const app  = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
res.send("server is running")
})
app.listen(PORT,()=>{
    console.log(`server started http://localhost:${PORT}`)
})
