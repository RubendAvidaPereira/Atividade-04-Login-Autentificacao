const express = require('express'); // Load express framework

const app = express()

const cors = require('cors')

const path = require('path')

app.use(express.json()); // Parse de requests do tipo application/json

app.use(express.urlencoded({ extended: true })); // Parse de conteudo do tipo application/x-www-from-urlencoded

app.use(express.static('public')); // Media, HTML, CSS and JS

app.use(cors({
    'origin': '*',
    "methods": 'GET, POST',

}))

require('./routes/routes.js')(app) // Routes

// Entrega de páginas HTML
//-------------------- Página Inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/templates/index.html'))
})


//-------------------- Bomba BP
app.get('/bp/:bomba_combustivel', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/templates/info_bomba.html'))
})


//-------------------- Bomba GALP
app.get('/galp/:bomba_combustivel', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/templates/info_bomba.html'))
})


//-------------------- Comparador GALP
app.get('/comparador_galp', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/templates/comparador_galp.html'))
})


//-------------------- Comparador BP
app.get('/comparador_bp', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/templates/comparador_bp.html'))
})


//-------------------- Comparador GALP
app.get('/bp_galp', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/templates/bp_galp.html'))
})


//-------------------- Sobre
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/templates/sobre.html'))
})

const PORT = 8080; // Porta 8080 - Onde o servidor vai escutar os pedidos e executar as respostas

app.listen(PORT, () => console.log(`Server Running - PORT ${PORT}`)) // Bind da porta com o servidor, ativando o mesmo