const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId, //grava o id do usuário que criou o spot
        ref: 'User' //referência para qual model é essa informação

    }
}, {
    toJSON: {
        virtuals: true, //adiciona rota de banco virtual para json
    },
})

SpotSchema.virtual('thumbnail_url').get(function() {//banco de dados virtual
    return `http://192.168.1.107:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema)