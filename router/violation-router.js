import express from "express";
import { getViolations, createViolation, updateViolation, deleteViolation,getViolationsById,getViolationsByVehicle } from "../controller/violation-controller.js";

// Create a router
const violationRouter = express.Router();


violationRouter.get("/", getViolations);  // http://localhost:5000/api/violation
violationRouter.get("/getById/:id", getViolationsById);  // http://localhost:5000/api/violation/getById/1
violationRouter.get("/getByVehicle/:licensePlateNumber", getViolationsByVehicle); // http://localhost:5000/api/violation/getByVehicle/ABC-123
violationRouter.post("/register", createViolation); // http://localhost:5000/api/violation/register
violationRouter.put("/update/:id", updateViolation); // http://localhost:5000/api/violation/update/1
violationRouter.delete("/delete/:id", deleteViolation); // http://localhost:5000/api/violation/delete/1


export default violationRouter;