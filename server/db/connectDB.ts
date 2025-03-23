import mongoose from "mongoose";

 const connectDB = async () => {
    try {
        // const dbUrl = `${process.env.MONGO_URL_LOCAL}/restaurant_2025`;
        const dbUrl = `${process.env.MONGO_URL}`;
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB Restaurant Database.");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

export default connectDB;
