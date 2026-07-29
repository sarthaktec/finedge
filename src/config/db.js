require("dotenv").config('');
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect to mongo db");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error);
        process.exit(1);
    }
    
}

const disconnectToMongoDB = async () => {
    await mongoose.connect.close();
    console.log("mongoDB is disconnected");
}

module.exports = {connectToMongoDB, disconnectToMongoDB};