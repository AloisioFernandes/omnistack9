const Spot = require('../models/Spot')

module.exports = {
    async show(req, res) { //listagem de spots do usuário logado
        const { user_id } = req.headers

        const spots = await Spot.find({ user: user_id })

        return res.json(spots)
    }
}