licitacoes = require('../models/licitacoes');
usuarios = require("../models/usuarios");
sugestoesModel = require("../models/estatisticas")

exports.listar = function (req, res) {
    licitacoes.countDocuments({}, function (err, allLicitacoes) {
        if (err) {
            console.log("ERRO AO BUSCAR TODAS AS LICITACOES");
        } else {
            licitacoes.countDocuments({'CategoriaLicitacao' : 'Agronegocio'}, function (err, allLicitacoesAgro) {
                if (err) {
                    console.log("ERRO AO BUSCAR LICITACOES NA CATEGORIA AGRONEGOCIO");
                } else {
                    usuarios.countDocuments({}, function (err, allUsers) {
                        if (err) {
                            console.log("ERRO AO BUSCAR LISTA DE USUARIOS");
                        } else {
                            console.log("GET /estatisticas/all 200")
                            res.status(200).json({
                                "totalLicitacoes" : allLicitacoes,
                                "totalLicitacoesAgro" : allLicitacoesAgro,
                                "totalUsuarios" : allUsers,
                            })
                        }
                    })
                }
            })
        }
    })
};


exports.inserirSugestoes = function (req, res) {
    const sugestoes = new sugestoesModel({
        email: req.body.email,
        sugestao: req.body.sugestao,
    })

    sugestoes.save((err, result) => {
        if (err) {
            console.log("POST /estatisticas/sugestoes 505")
            res.status(200).json({
                "code": 505,
                "message": "ERRO NÃO INDEXADO",
                "error": err
            })
        } else {
            console.log("POST /estatisticas/sugestoes 200")
            res.status(200).json({
                "code": 200,
                "message": "CADASTRO DE SUGESTÃO REALIZADO COM SUCESSO"
            });
        }
    })
};