import express from "express";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle,getVehicleById } from "../controller/vehicle-controller.js"; 


// Create a router
const vehicleRouter = express.Router(); 

vehicleRouter.get("/", getVehicles);  // http://localhost:5000/api/vehicle
vehicleRouter.get("/getById/:licensePlateNumber", getVehicleById);  // http://localhost:5000/api/vehicle/getById/ABC-123
vehicleRouter.post("/register", createVehicle);  // http://localhost:5000/api/vehicle/register
vehicleRouter.put("/update/:licensePlateNumber", updateVehicle);  // http://localhost:5000/api/vehicle/update/ABC-123
vehicleRouter.delete("/delete/:licensePlateNumber", deleteVehicle); // http://localhost:5000/api/vehicle/delete/ABC-123


// Export the router
export default vehicleRouter;