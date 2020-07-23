const express = require('express')
const mongoose = require('mongoose') //interage com banco de dados mongo, criando tabelas, alterando ou armazenando dados
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()
const server = http.Server(app)
const io = socketio(server) //servidor agora passa a entender o protocolo websocket

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack.ycdjk.mongodb.net/semana09?retryWrites=true&w=majority', {// conecta ao banco de dados
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {}

io.on('connection', socket => { //toda vez que um usuário conectar ao servidor, anotará a informação de que ele está logado
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json()) //permite ao express entender requisições do tipo json
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3333) //aplicação agora ouve tanto requisições http como websocket