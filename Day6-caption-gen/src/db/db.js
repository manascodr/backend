import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error while connecting to DB", err);
        // Optionally: throw err;
    }
}

export default connectDB;
