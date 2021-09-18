const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    ///crar la instancia del ticketlist
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      // Escuchar evento: mensaje-to-server
      //callback es el 3er param en el llamdo de react(hace referencia al 3er para en react que es un callback)
      socket.on("solicitar-ticket", (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
        console.log(nuevoTicket);
      });

      //"siguiente-ticket-trabajar"
      socket.on(
        "siguiente-ticket-trabajar",
        ({ agente, escritorio }, callback) => {
          //   const {agente, escritorio} = usuario
          const suTicket = this.ticketList.asignarTicket(agente, escritorio);
          callback(suTicket);
          this.io.emit("ticket-asignado", this.ticketList.ultimos13);
        }
      );
    });
  }
}

module.exports = Sockets;
