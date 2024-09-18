import express from "express";
import Rando from "../Models/Rando.js";
import { createError } from "../Outils/Error.js";
import { CreateRando, DeleteRando, GetRando, GetRandos, UpdateRando, countByPlace } from "../Controllers/RondoController.js";
import { verifyAdmin } from "../Outils/Verify_Token.js";

const router = express.Router();

//CREATE
router.post("/",verifyAdmin,CreateRando);
//Update
router.put("/:id",verifyAdmin,UpdateRando)

//Delete
router.delete("/:id",verifyAdmin,DeleteRando)
//Get
router.get("/find/:id",GetRando);
//GettAll
router.get("/",GetRandos)

//GETALL BY COUNT
router.get("/countByPlace",countByPlace)




export default router