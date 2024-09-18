import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./Routes/auth.js"
import randosRoute from "./Routes/randos.js"
import usersRoute from "./Routes/users.js"
import cookieParser from 'cookie-parser';
import reservationsRoute from "./Routes/reservation.js"; // Ajout de cette ligne


const app = express()
dotenv.config()


const connect = async() => 
{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected To MongoDB")
    }catch (error){
    throw error
    }

};

//LE CAS DE DISCONNECTER NOTRE BASE

mongoose.connection.on("disconnected", () =>
{
    console.log("MongoDB Disconnected ! ")
})

// Middlwears
app.use(cookieParser());

app.use(express.json()); //on l'utilise pour que dans votre api request on peux utiliser un body request

app.use("/api/auth" , authRoute);
app.use("/api/randos" , randosRoute);
app.use("/api/users" , usersRoute);
app.use("/api/reservations", reservationsRoute); // Ajout de cette ligne


app.use((err,req,res,next)=>
{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Y a un erreur"

    return res.status(errorStatus).json({
        success:false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack,
    })
})


app.listen(4000, () =>{
    connect()
    console.log("connected to backend.")
})