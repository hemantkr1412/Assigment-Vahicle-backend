import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import vehicleRouter from "./router/vehicle-router.js";
import violationRouter from "./router/violation-router.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/vehicle", vehicleRouter);   // http://localhost:5000/api/vehicle
app.use("/api/violation", violationRouter); // http://localhost:5000/api/violation

app.get("/", (req, res) => {
    res.send("Welcome to the server");
});



const PORT = process.env.PORT || 4000; 
const url = process.env.MONGODB_URL;    // mongodb://localhost:27017/traffic

// Connect to MongoDB
mongoose.connect(url
)
.then(() => app.listen(PORT))
.then(() => console.log("Connected to Database and Listening To Localhost 4000"))
.catch((err) => console.log(err));





