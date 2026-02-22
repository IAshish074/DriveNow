const mongoose = require("mongoose");

// Cache the connection across serverless invocations
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGO_URI, {
                bufferCommands: false,
                serverSelectionTimeoutMS: 10000,
            })
            .then((m) => {
                console.log("MongoDB connected ✅");
                return m;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

module.exports = connectDb;