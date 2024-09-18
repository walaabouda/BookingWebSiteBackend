import express from "express";
import { CreateReservation, DeleteReservation, GetReservation, GetReservations, UpdateReservation } from "../Controllers/ReservationController.js";
import { verifyAdmin } from "../Outils/Verify_Token.js";
import createError from 'http-errors';

const router = express.Router();

// CREATE
router.post("/", CreateReservation);

// UPDATE
router.put("/:id", verifyAdmin, UpdateReservation);

// DELETE
router.delete("/:id", verifyAdmin, DeleteReservation);

// GET
router.get("/find/:id", GetReservation);

// GET ALL
router.get("/", GetReservations);

export default router;
