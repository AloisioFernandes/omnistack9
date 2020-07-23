const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {//qual usuário solicitou a reserva
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {// qual spot o usuário quer criar reserva
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
})

module.exports = mongoose.model('Booking', BookingSchema)