const mongoose = require("mongoose");

let isConnected=false;

const connectDB = async () => {
    if (isConnected) return;
    try{
        const db= await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        isConnected= db.connections[0].readyState;
    }catch(err){
        console.log("MongoDB connection failed", err);
        process.exit(1);
    }
}

module.exports = connectDB;

