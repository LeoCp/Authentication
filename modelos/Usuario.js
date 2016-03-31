var mongoose = require('mongoose')
,Schema = mongoose.Schema
,UsuarioSchema = new Schema({
    nome: String,
    senha: String,
    token: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
