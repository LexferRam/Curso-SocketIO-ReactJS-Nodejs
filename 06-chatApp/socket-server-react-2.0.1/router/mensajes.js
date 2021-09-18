/* 
    Path: api/mensajes
 */
const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const { obtenerChat } = require("../controllers/mensajes");

router.get("/:de", validarJWT, obtenerChat);

module.exports = router;
