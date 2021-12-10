const database = require("nedb")

let db = {}
db.users = new database("users.db")
db.users.loadDatabase()

// Registo de um utilizador na base de dados
exports.crud_register = (username, password) => {
    return new Promise((resolve, reject) => {
        data = {
            user: username,
            pwd: password,
        };
        db.users.insert(data, (err, dados) => {
            if (err) {
                reject(null)
            }
            else {
                resolve(dados)
            }
        })
    })
}

// Autentificação do utilizador na base de dados
exports.crud_login = (username) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({user: username}, (err, dados) => {
            if (err) {
                reject(null)
            }
            else {
                resolve(dados)
            }
        })
    })
}