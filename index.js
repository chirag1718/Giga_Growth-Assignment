import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// Connection to DB
mongoose.set("strictQuery", true);
const db = process.env.DB_CONNECT;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db "))
  .catch((e) => console.log(e, "Mongo DB connection error"));

//  Middlewares
app.use(cors());
app.use(bodyParser.json());

// Route Imports
import authRoute from "./routes/auth.js";
import dashboardRoute from "./routes/dashboard.js";

// Route Middleware
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/dashboard", dashboardRoute);

// App connection
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log("Server is up and running");
});
