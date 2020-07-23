const mongoose = require('mongoose')
//schema representa a estrutura, os campos que o usuário terá
const UserSchema = new mongoose.Schema({
    email: String,
})

module.exports = mongoose.model('User', UserSchema) //criando um usuário no banco de dados