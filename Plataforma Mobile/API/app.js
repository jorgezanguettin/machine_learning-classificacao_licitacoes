const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const licitacoesRoutes = require("./src/routes/licitacoes");
const usuariosRoutes = require("./src/routes/usuarios");
const estatisticasRoutes = require("./src/routes/estatisticas");

mongoose.connect('STRING_CONEXÃO_MONGODB', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});

app.use("/usuarios", usuariosRoutes);

app.use("/licitacoes", licitacoesRoutes);

app.use("/estatisticas", estatisticasRoutes)

app.use((req, res, next) => {
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;