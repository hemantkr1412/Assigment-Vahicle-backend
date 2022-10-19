import mongoose from "mongoose";


const Schema = mongoose.Schema;

// Create a schema for the vehicle
const VehicleShema= new Schema({

    
        id: {
            type: String,
            required: true,
            unique: true,

        },
        licensePlateNumber: {
            type: String,
            required: true,
            unique: true,
            minlength:10,
            maxlength:10
        },
        manufacturerName: {
            type: String,
            required: true,
            unique: true,
            minlength:5,
            maxlength:5
        },
        model: {
            type: String,
            required: true,
            unique: true,
            minlength:4,
            maxlength:4
        },
        fuelType: {
            type: String,
            required: true,
        },
        ownerName: {
            type: String,
            required: true,

        },
        rc_status: {
            type: String,
            required: true,
        },
        vehicleColor: {
            type: String,
            required: true,
        },
        registrationDate: {
            type: Date,
            required: true,
        },
        insuranceUpto: {
            type: Date,
            required: true,
        },
        fitnessUpto: {
            type: Date,
            required: true,
        },
        roadTaxUpto: {
            type: Date,
            required: true,
        }
});

// Export the model
export default mongoose.model('Vehicle',VehicleShema);