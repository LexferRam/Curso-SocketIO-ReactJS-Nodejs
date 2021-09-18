/*
path: api/login
*/
const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
//nuevos users
router.post(
  "/new",
  [
    check("nombre", "El nombre es obligario").not().isEmpty(),
    check("password", "El password es obligario").not().isEmpty(),
    check("email", "El email es obligario").isEmail(),
    validarCampos,
  ],
  crearUsuario
);
//login
router.post(
  "/",
  [
    check("email", "El email es obligario").isEmail(),
    check("password", "El password es obligario").not().isEmpty(),
    validarCampos,
  ],
  login
);
//revalidar token
router.get("/renew", validarJWT, renewToken);
module.exports = router;
