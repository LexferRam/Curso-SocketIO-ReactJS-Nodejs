// Server Model: Contiene todo el servidor de express + socket.io configurado
const Server = require("./models/server");

// Paquete para leer y establecer las variables de entorno
require("dotenv").config();

// Inicializar la instancia del server
const server = new Server();

// Ejecutar el server
server.execute();

//WebSocket es un protocolo de red basado en TCP  permite que una aplicación web establezca
// un canal de comunicación bi-direccional persistente entre la capa de presentación HTML en el browser y el servidor

// modelo TCP/IP es un protocolo para comunicación en redes que permite que un equipo pueda comunicarse dentro de una red

// El Protocolo de transferencia de hipertexto (en inglés, Hypertext Transfer Protocol, abreviado HTTP) es el protocolo
// de comunicación que permite las transferencias de información a través de archivos (XHML, HTML . . .) en la World Wide Web

//.on() escucha un evento y ejecuta un callback
//.emit() emite un evento y envia un objeto
