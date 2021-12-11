require("dotenv").config();

const db = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Registar utilizador
exports.register = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'EmptyFormException' }) // Se o formulario estiver vazio, erro 400
    }
    try {
        const auth = req.body // JSON com o username e password do cliente
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(auth.password, salt) // Hash da password fornecido com o salt gerado
        db.crud_register(auth.username, hashPassword) // Guarda na base de dados o User
        .then((dados) => {
            res.status(201).send({ message: `Utilizador criado - ${auth.username} ` })
        })
    } catch {
        return res.status(400).send({ message: 'RegisterFormNotSuccesfull' }) // caso algum erro ocorra, erro 400
    }
}

// Login do utilizador
exports.login = async (req, res) => {
    if (!req.body) {
        res.staus(400).send({ message: 'EmptyFormException' })
    }
    try {
        const auth = req.body
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(auth.password, salt) // Hash da password fornecido com o salt gerado
        db.crud_login(auth.username) // Pede os dados referentes à conta com o username pedido
        .then(async (dados) => {
            if (dados == null) {
                res.status(401).send({ message: 'UserNotFoundException' }) // Caso nenhum utilizador seja encontrado, erro 401
            }
            else {
                bcrypt.compare(auth.password, dados.pwd, (err, result) => { // Compara a password fornecida com a password guardada na base de dados pelas suas hashs
                    if (result) {
                        const user = dados.user
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                        res.json({ token: accessToken , user: user })
                    }
                    else {
                        res.status(403).send({ message: "PasswordNotMatchException"}) // Caso as passwords não sejam iguais, erro 403
                    }
                })
            }
        })
    } catch {
        res.status(400).send({ message: dados })
    }
}