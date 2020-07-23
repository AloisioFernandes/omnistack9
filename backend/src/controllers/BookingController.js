const Booking = require('../models/Booking')

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers
        const { spot_id } = req.params
        const { date } = req.body

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        })

        await booking.populate('spot').populate('user').execPopulate() //preenche dados de usuário e spot pelo mongo

        const ownerSocket = req.connectedUsers[booking.spot.user] //busca uma conexão em tempo real com o criador do spot
        
        if(ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking) //envia mensagem para criador do spot
        }

        return res.json(booking)
    }
}