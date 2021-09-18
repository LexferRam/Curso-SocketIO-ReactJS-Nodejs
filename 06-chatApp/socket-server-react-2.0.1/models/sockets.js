const { comprobarJWT } = require("../helpers/jwt");
const {
  usuarioConectado,
  usuarioDesonectado,
  getUsuarios,
  grabarMensaje,
} = require("../controllers/sockets");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query["x-token"]);

      if (!valido) {
        console.log("Socket no identificado");
        return socket.disconnect();
      }

      console.log("cliente conectado", uid);
      const usuario = await usuarioConectado(uid);
      console.log("se conecto " + usuario.nombre);
      //unir al usuario a una sala de socket.io
      socket.join(uid);

      //validar el JWT
      //si el token no es valido, desconectar
      //saber que usuario esta activo mediante el uid

      //emitir todos los usuarios conectados
      this.io.emit("lista-usuarios", await getUsuarios());

      //socket join(unir un user a una sala
      //escuchar cuando el cliente manda un mensaje(mensaje personal))
      socket.on("mensaje-personal", async (payload) => {
        const mensaje = await grabarMensaje(payload);
        this.io.to(payload.para).emit("mensaje-personal", mensaje);
        this.io.to(payload.de).emit("mensaje-personal", mensaje);
      });

      //disconnect(marcar en la BDs que el user se desconecto)
      socket.on("disconnect", async () => {
        console.log("Cliente desconectado", uid);
        await usuarioDesonectado(uid);
        this.io.emit("lista-usuarios", await getUsuarios());
      });
    });
  }
}

module.exports = Sockets;
