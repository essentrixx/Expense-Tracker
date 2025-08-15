const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected ✅');
    } catch (err) {
        console.error('MongoDB connection error ❌', err);
        process.exit(1); // Stop server if DB fails
    }
};

module.exports = connectDB;
