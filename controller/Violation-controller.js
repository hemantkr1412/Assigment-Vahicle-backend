import Violation from "../models/Violation";
import Vehicle from "../models/Vehicle";


//get all violations
export const getViolations = async (req, res) => {
    try {
        const violations = await Violation.find();
        res.status(200).json(violations);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}


//get violation by Violation License Plate Number
export const getViolationsByVehicle = async (req, res) => {
    const { licensePlateNumber } = req.params;
    let existingVehicle;
    try {
        //Check if the vehicle exists or not
        existingVehicle = await Vehicle.findOne({ licensePlateNumber: licensePlateNumber });
    } catch (err) {

        //if error occurs
        return res.status(500).json({ message: "Something went wrong", err: err.message });
    }
    if (existingVehicle === null) {
        //if Vehicle does not exist
        return res.status(409).json({ message: "Vehicle does not exist" });
    }
    try {
        //if Vehicle exists
        const violations = await Violation.find({ licensePlateNumber: licensePlateNumber });
        res.status(200).json(violations);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}



//get violation by Violation ID
export const getViolationsById = async (req, res) => {
    const { id } = req.params;
    let existingViolation;
    try {
        //check if violation exists in the database or not
        existingViolation = await Violation.findOne({ id: id });
    } catch (err) {
        //if error occurs
        return res.status(500).json({ message: "Something went wrong", err: err.message });
    }
    if (existingViolation === null) {
        //if violation does not exist
        return res.status(409).json({ message: "Violation does not exist" });
    }
    try {
        //if violation exists
        const violations = await Violation.find({ id: id });
        res.status(200).json(violations);
    } catch (error) {
        //if error occurs
        return res.status(404).json({ message: error.message });
    }   
}



//create a violation
export const createViolation = async (req, res) => {
    const violation = req.body;
    let existingVehicle ;
    try{
        //check if vehicle exists or not in the database
        existingVehicle = await Vehicle.findOne({ licensePlateNumber: violation.licensePlateNumber });
    }catch(err){

        return res.status(500).json({message: "Something went wrong"});
    }
    if(existingVehicle){
        //if vehicle exists, create a new violation
        try {
            const newViolation = new Violation(violation);
            await newViolation.save();
            res.status(201).json(newViolation);
        } catch (error) {
            return res.status(409).json({ message: error.message });
        }
    
    }else{
        //if vehicle does not exist, return error
        return res.status(409).json({message: "Vehicle does not exist"});
    }
}




//update a violation by Violation ID
export const updateViolation = async (req, res) => {
    const { id } = req.params;
    const violation = req.body;
    let existingViolation ; 
    let existingVehicle;
    try{
        //check if violation exists in database or not
        existingViolation = await Violation.findOne({ id: id });

        //check if vehicle exists in database or not
        existingVehicle = await Vehicle.findOne({ licensePlateNumber: violation.licensePlateNumber });
    }catch(err){

        //if error occurs
        return res.status(500).json({message: "Something went wrong",err: err.message});
    }
    if(existingViolation===null || existingVehicle===null){

        //if violation or vehicle does not exist
        return res.status(409).json({message: "Violation/Vehicle does not exist"});
    }
    try{
        //update violation
        const updatedViolation = await Violation.updateOne({id: id}, violation, { new: true });
        res.status(201).json(updatedViolation);
    }catch(err){

        //if error occurs
        return res.status(500).json({message: "Something went wrong",err: err.message});
    }
}


//delete a violation by Violation ID
export const deleteViolation = async (req, res) => {

    //get violation id from request
    const { id } = req.params;
    let existingViolation ;


    try{
        //check if violation exists in database or not

        existingViolation = await Violation.findOne({id: id });

    }catch(err){
        //if error occurs
        return res.status(500).json({message: "Something went wrong",err: err.message});
    }
    if(existingViolation===null){
        //if violation does not exist
        return res.status(409).json({message: "Violation does not exist"});
    }

    try{
        //delete violation
        await Violation.deleteOne({ id: id });
        res.json({ message: "Violation deleted successfully" });
    }catch(err){
        //if error occurs
        return res.status(500).json({message: "Something went wrong",err:err.message});
    }
}