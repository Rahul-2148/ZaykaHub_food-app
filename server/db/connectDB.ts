import mongoose from "mongoose";

 const connectDB = async () => {
    try {
        // Use Atlas URI from env only.
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL is missing in .env");
        }

        // Do not override DB name unless explicitly provided.
        // If MONGO_DB_NAME is absent, Mongo uses the DB from MONGO_URL path.
        const options = process.env.MONGO_DB_NAME
            ? { dbName: process.env.MONGO_DB_NAME }
            : undefined;

        await mongoose.connect(mongoUrl, options);
        console.log(`Connected to MongoDB. Active database: ${mongoose.connection.name}`);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

export default connectDB;
