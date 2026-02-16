const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
        // mongoose.connection.on('connected',()=>{
        //     console.log("Database Connected")
        // })
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected")
    }
    catch(error){
        console.log("erorr while connecting to DB ",error)
    }
}

module.exports = connectDb