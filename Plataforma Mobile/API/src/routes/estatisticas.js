const express = require("express");
const router = express.Router();
const estatisticasController = require("../controllers/estatisticas");

router.get("/all", estatisticasController.listar)
router.post("/sugestoes", estatisticasController.inserirSugestoes)

module.exports = router;