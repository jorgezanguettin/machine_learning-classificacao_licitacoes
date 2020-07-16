const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios");

// router.get("/listar",usuarioController.listar);
router.post("/cadastrar", usuarioController.cadastrar);
router.post("/login", usuarioController.login);
router.post("/alterarsenha", usuarioController.alterar_senha);
router.post("/deletar", usuarioController.deletar)

module.exports = router;