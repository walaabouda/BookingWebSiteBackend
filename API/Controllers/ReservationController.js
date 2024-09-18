import Reservation from "../Models/Reservation.js";
import Rando from "../Models/Rando.js";
import User from "../Models/User.js";
import createError from 'http-errors';

// CREATE
export const CreateReservation = async (req, res, next) => {
    const { user_id, rando_id, date, numberOfPersons } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const userExists = await User.findById(user_id);
        if (!userExists) {
            throw createError(404, 'Utilisateur non trouvé');
        }

        // Vérifier si la randonnée existe
        const randoExists = await Rando.findById(rando_id);
        if (!randoExists) {
            throw createError(404, 'Randonnée non trouvée');
        }

        // Créer la réservation avec numberOfPersons
        const newReservation = new Reservation({
            user: user_id,
            rando: rando_id,
            date: date,
            numberOfPersons: numberOfPersons,
        });

        // Enregistrer la réservation
        const savedReservation = await newReservation.save();
        res.status(200).json(savedReservation);
    } catch (err) {
        next(err);
    }
};


// UPDATE
export const UpdateReservation = async (req, res, next) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedReservation) {
            throw createError(404, 'Réservation non trouvée');
        }

        res.status(200).json(updatedReservation);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const DeleteReservation = async (req, res, next) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            throw createError(404, 'Réservation non trouvée');
        }

        res.status(200).json("Réservation supprimée !");
    } catch (err) {
        next(err);
    }
};

// GET
export const GetReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            throw createError(404, 'Réservation non trouvée');
        }

        res.status(200).json(reservation);
    } catch (err) {
        next(err);
    }
};

// GET ALL
export const GetReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        next(err);
    }
};
