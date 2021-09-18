const Marcadores = require("./marcadores");

class Sockets {
  constructor(io) {
    this.io = io;

    this.marcadores = new Marcadores();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // marcadores-activos
      socket.emit("marcadores-activos", this.marcadores.activos);
      //marcador-nuevo
      socket.on("marcador-nuevo", (marcador) => {
        this.marcadores.agregarMaracador(marcador);

        socket.broadcast.emit("marcador-nuevo", marcador);
      });

      //marcador-actualizado
      socket.on("marcador-actualizado", (marcador) => {
        this.marcadores.actualizaMarcador(marcador);

        socket.broadcast.emit("marcador-actualizado", marcador);
      });
    });
  }
}

module.exports = Sockets;
