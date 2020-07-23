// métodos para as rotas, index, show, update, store, destroy
//req.query acessa query params(filtros), req.params acessa route params(edição, deletar), req.body acessa corpo da requisição(criação, edição)
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email } = req.body

        let user = await User.findOne({ email }) //busca pelo email no banco de dados

        if(!user) { //se o email não for encontrado no banco de dados ele será criado
            user = await User.create({ email }) //cadastra email no banco de dados, processo que pode demorar um pouco
        }

        return res.json(user)
    }
}