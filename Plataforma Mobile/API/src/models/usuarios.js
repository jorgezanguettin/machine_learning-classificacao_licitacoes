var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nomeCompleto: {type: String, required: true},
    criadoEm: {type: Date, default: Date.now},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true}
})

module.exports = mongoose.model("contas", usuarioSchema);