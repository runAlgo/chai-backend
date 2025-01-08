import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // This handles coming request through web browser
    credentials: true, // It means  our server can able to get jwt tokens from web browser
  }),
);

app.use(express.json({ limit: "16kb" })); // Handling form input Data
app.use(express.urlencoded({extended: true, limit: "16kb"})); // Handling coming Data through URL
app.use(express.static("public"));
app.use(cookieParser());


// routes import

import userRouter from "./routes/user.routes.js"




// routes declaration
app.use("/api/v1/users", userRouter)
// http://localhost:8000/api/v1/users/register

export { app };
