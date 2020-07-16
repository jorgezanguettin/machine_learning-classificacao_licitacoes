var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    email: {type: String, required: true},
    criadoEm: {type: Date, default: Date.now},
    sugestao: {type: String, required: true},
})

module.exports = mongoose.model("estatisticas", usuarioSchema);