const usuarioModel = require("../models/usuarios");

exports.cadastrar = function (req, res) {
    const usuario = new usuarioModel({
        nomeCompleto: req.body.nomeCompleto,
        email: req.body.email,
        senha: req.body.senha
    })
    senhaUser = req.body.senha
    if (req.body.email === undefined || req.body.email === '' || req.body.email.includes("@") === false || req.body.email.includes(".com") === false) {
        console.log("POST /usuarios/cadastrar 501")
        res.status(200).json({
            "code": 501,
            "message": "E-MAIL INVALIDO"
        })
    } else if (senhaUser === undefined || senhaUser === '' || senhaUser.length < 8) {
        console.log("POST /usuarios/cadastrar 502")
        res.status(200).json({
            "code": 502,
            "message": "SENHA INVALIDA"
        })
    } else if (req.body.nomeCompleto === undefined || req.body.nomeCompleto === '') {
        console.log("POST /usuarios/cadastrar 503")
        res.status(200).json({
            "code": 503,
            "message": "NOME INVALIDO"
        })
    } else {
        usuario.save((err, result) => {
            if (err) {
                if (err.code === 11000) {
                    console.log("POST /usuarios/cadastrar 504")
                    res.status(200).json({
                        "code": 504,
                        "message": "EMAIL EXISTENTE"
                    })
                } else {
                    console.log("POST /usuarios/cadastrar 505")
                    res.status(200).json({
                        "code": 505,
                        "message": "ERRO NÃO INDEXADO",
                        "error": err
                    })
                }
            } else {
                console.log("POST /usuarios/cadastrar 200")
                res.status(200).json({
                    "code": 200,
                    "message": "CADASTRO REALIZADO COM SUCESSO"
                });
            }
        })
    }
};

exports.login = function (req, res) {
    usuarioModel.findOne({
        email: req.body.email,
        senha: req.body.senha
    }, (err, result) => {
        if (err) {
            console.log("POST /usuarios/login 400")
            res.status(200).json({
                "code": 400,
                "message": "ERRO NÃO INDEXADO",
                "erro": err
            })
        } else {
            if (result === null) {
                console.log("POST /usuarios/login 401")
                res.status(200).json({
                    "code": 401,
                    "messsage": "USUARIO NÃO CADASTRADO OU SENHA INVALIDA"
                })
            } else {
                console.log("POST /usuarios/login 200")
                res.status(200).json({
                    "code": 200,
                    "message": "LOGIN REALIZADO COM SUCESSO",
                    "nomeCompleto": result.nomeCompleto
                })
            }
        }
    })
}

exports.listar = function (req, res) {
    usuarioModel.find({}, (err, result) => {
        if (err) {
            console.log("GET /usuarios/listar 400")
            res.status(200).json({
                "code": 400,
                "message": "ERRO NÃO INDEXADO",
                "erro": err
            })
        } else {
            console.log("GET /usuarios/listar 200")
            res.status(200).json({
                "code": 200,
                "message": "BUSCA REALIZADA COM SUCESSO",
                "result": result
            })
        }
    })
};

exports.alterar_senha = function (req, res) {
    senhaNova = req.body.novaSenha
    if (senhaNova === undefined || senhaNova === '' || senhaNova.length < 8) {
        console.log("POST /usuarios/alterarsenha 502")
        res.status(200).json({
            "code": 502,
            "message": "SUA NOVA SENHA DEVE CONTER 8 DIGITOS NO MINIMO!"
        })}
    else {
        usuarioModel.updateOne({
            email: req.body.email,
            senha: req.body.senha
        }, {
            $set : {
                senha: req.body.novaSenha
            }
        }, (err, result) => {
            if (err) {
                console.log("POST /usuarios/alterarsenha 400")
                res.status(200).json({
                    "code" : 400,
                    "message": "ERRO NÃO INDEXADO",
                    "erro" : err
                })
            } else {
                console.log("POST /usuarios/alterarsenha 200")
                res.status(200).json({
                    "code": 200,
                    "message" : "SENHA ALTERADA COM SUCESSO"
                })
            }
        })
    }
};

exports.deletar = function (req, res) {
    usuarioModel.deleteOne({
        email: req.body.email,
        senha: req.body.senha
    }, (err, result) => {
        if (err) {
            console.log("POST /usuarios/deletar 400")
            res.status(200).json({
                "code" : 400,
                "message": "ERRO NÃO INDEXADO",
                "erro" : err
            })
        } else if (result.n == 1) {
            console.log("POST /usuarios/deletar 200")
            res.status(200).json({
                "code": 200,
                "message" : "USUARIO DELETADO COM SUCESSO"
            })
        } else {
            console.log("POST /usuarios/deletar 401")
            res.status(200).json({
                "code": 401,
                "message" : "USUARIO NÃO ENCONTRADO"
            })
        }
    })
};