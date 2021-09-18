const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    ///veirficar que el email no exista
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    //guardar user en BDs
    const usuario = Usuario(req.body);

    //encriptar contrasena
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //generar jwt
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //verificar si existe el email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }
    //validar el password
    const validPassowrd = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassowrd) {
      return res.status(404).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }
    //generar JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;

  //generar un nuevo JWT
  const token = await generarJWT(uid);

  //obtener el usr por UID
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: "true",
    usuario,
    token,
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
