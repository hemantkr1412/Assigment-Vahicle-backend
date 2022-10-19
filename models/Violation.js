import mongoose from "mongoose";
const Schema = mongoose.Schema;


// Create a schema for the Violation
const ViolationShema= new Schema({
   
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
        violationType: {
            type: String,
            required: true,

        },
        status: {
            type: String,
            required: true,
        },
        date:{
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        }
       
        
    

});

// Create a model for the Violation
export default mongoose.model('Violation',ViolationShema);