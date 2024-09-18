import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rando: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rando',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    numberOfPersons: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;
