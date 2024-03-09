const express = require("express");
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");
const userRouter = require("./routers/userRouter");
const commentRouter = require("./routers/commentRouter");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const DbConnect = require("./dbConnect");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
dotenv.config("./.env");

const {
    PORT,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECTRET_KEY,
} = process.env;

// Configuration
cloudinary.config({
    cloud_name: `${CLOUDINARY_CLOUD_NAME}`,
    api_key: `${CLOUDINARY_API_KEY}`,
    api_secret: `${CLOUDINARY_SECTRET_KEY}`,
});

const app = express();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(morgan("common"));
app.use(cookieParser());

let origin = "http://localhost:3000";
if (process.env.NODE_ENV === "production") {
    origin = process.env.CORS_ORIGIN;
}

app.use(
    cors({
        credentials: true,
        origin,
    })
);

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);

app.get("/", (req, res) => {
    res.status(200).send("Hi from Server");
});

DbConnect();
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
