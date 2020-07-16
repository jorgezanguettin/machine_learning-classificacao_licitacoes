licitacoes = require('../models/licitacoes');

exports.listar = function(req, res) {
    licitacoes.find({}, function(err, allLicitacoes ) {
        if (err){
            console.log("GET /licitacoes/all 400")
            res.send(err);
        } else {
            console.log("GET /licitacoes/all 200")
        res.json(allLicitacoes);
        }
    });
};

exports.listarCategoria = function(req, res) {
    licitacoes.find({ CategoriaLicitacao : req.body.categoria }, function(err, allLicitacoes) {
        if (err) {
            console.log("POST /licitacoes/categoria 400")
            res.send(err);
        } else {
            console.log("POST /licitacoes/categoria 200")
            res.json(allLicitacoes);
        }
    });
};

exports.listarOne = function(req, res) {
    licitacoes.findOne({ _id : req.body.id }, function(err, allLicitacoes) {
        if (err) {
            console.log("POST /licitacoes/one 400")
            res.send(err);
        } else {
            console.log("POST /licitacoes/one 200")
            res.json(allLicitacoes);
        }
    });
};