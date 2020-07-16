const express = require("express");
const router = express.Router();
const licitacoesController = require("../controllers/licitacoes");

router.get("/all", licitacoesController.listar)
router.post("/categoria/", licitacoesController.listarCategoria)
router.post("/one/", licitacoesController.listarOne)

module.exports = router;