import Vehicle from "../models/Vehicle";


//get all violations
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        //if error occurs
        return res.status(404).json({ message: error.message });
    }
}


//get vehicle by license plate number
export const getVehicleById = async (req, res) => {
    const { licensePlateNumber } = req.params;
    let existingVehicle;
    try {
        //check if vehicle exists in the database or not
        existingVehicle = await Vehicle.findOne({ licensePlateNumber: licensePlateNumber });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong", err: err.message });
    }
    if (existingVehicle === null) {
        return res.status(409).json({ message: "Vehicle does not exist" });
    }
    try {
        //if vehicle exists
        //Find the vehicle by license plate number
        const vehicles = await Vehicle.find({ licensePlateNumber: licensePlateNumber });
        res.status(200).json(vehicles);
    } catch (error) {
        //if error occurs
        return res.status(404).json({ message: error.message });
    }
}


//create a vehicle
export const createVehicle = async (req, res) => {
    const vehicle = req.body;
    let existingVehicle ;
    try{
        //check if vehicle exists or not in the database
        existingVehicle = await Vehicle.findOne({ licensePlateNumber: vehicle.licensePlateNumber });
    }catch(err){
        //if error occurs
        return res.status(500).json({message: "Something went wrong"});
    }
    if(existingVehicle){
        //if vehicle exists
        return res.status(409).json({message: "Vehicle already exists"});
    }
    try {
        //if vehicle does not exist

        //create a new vehicle
        const newVehicle = new Vehicle(vehicle);
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        //if error occurs
        return res.status(409).json({ message: error.message });
    }
}


//update a vehicle by license plate number
export const updateVehicle = async (req, res) => {
    const { licensePlateNumber } = req.params;
    const vehicle = req.body;
    let existingVehicle ;
    try{
        //check if vehicle exists or not in the database
        existingVehicle = await Vehicle.findOne({ licensePlateNumber: licensePlateNumber });
    }catch(err){
        //if error occurs
        return res.status(500).json({message: "Something went wrong",err: err.message});
    }
    if(existingVehicle===null){
        //if vehicle does not exist
        return res.status(409).json({message: "Vehicle does not exist"});
    }
    try{
        //if vehicle exists

        //update the vehicle
        const updatedVehicle = await Vehicle.updateOne({licensePlateNumber:licensePlateNumber}, vehicle, { new: true });
        res.status(201).json(updatedVehicle);
    }catch(err){
        //if error occurs
        return res.status(500).json({message: "Something went wrong",err: err.message});
    }

}


//delete a vehicle by license plate number
export const deleteVehicle = async (req, res) => {
    const { licensePlateNumber } = req.params;
    console.log(licensePlateNumber);
    let existingVehicle ;
    try{
        //check if vehicle exists or not in the database
        existingVehicle = await Vehicle.findOne({ licensePlateNumber: licensePlateNumber });
    }catch(err){
        //if error occurs
        return res.status(500).json({message: "Something went wrong",err: err.message});
    }
    if(existingVehicle===null){
        //if vehicle does not exist
        return res.status(409).json({message: "Vehicle does not exist"});
    }

    try{
        //if vehicle exists

        //delete the vehicle
        await Vehicle.deleteOne({ licensePlateNumber: licensePlateNumber });
        res.json({ message: "Vehicle deleted successfully" });
    }catch(err){
        //if error occurs
        return res.status(500).json({message: "Something went wrong",err:err.message});
    }

}