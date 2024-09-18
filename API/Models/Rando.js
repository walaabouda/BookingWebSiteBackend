import mongoose from 'mongoose';

const RandoSchema = new mongoose.Schema({
    name : 
    {
        type : String,
        required : true
    },
    type : 
    {
        type : String,
        required : true
    },
    place : 
    {
        type : String,
        required : true
    },
    distance : 
    {
        type : String,
        required : true
    },
    startDate : 
    {
        type : Date,
        required : true
    },
    endDate : 
    {
        type : Date,
        required : true
    },
    photos: [
        {
          type: String,
          required: true,
        },
      ],
    description : 
    {
        type : String,
        required : true
    },
    price : 
    {
        type : Number,
        required : true
    },
   


});

export default mongoose.model("Rando", RandoSchema)