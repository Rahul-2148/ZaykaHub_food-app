import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";

// database
import connectDB from './db/connectDB';

// importing routes
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import reviewsRoute from "./routes/rating.route";
import commentRoute from "./routes/comment.route";
import replyRoute from "./routes/reply.route";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(cookieParser());
const corsOptions = {
    // origin: "http://localhost:5173",
    origin: "https://zaykahub-food-app.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));


// using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/rating", reviewsRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/reply", replyRoute);

app.use(express.static(path.join(DIRNAME,"/client/dist")));
app.use("*",(_,res) => {
    res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
});

// default route
app.get('/', (req, res) => {
    res.send('Restaurant 2025 with typescript Website Testing...');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});