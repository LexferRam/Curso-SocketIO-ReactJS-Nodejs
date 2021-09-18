class Marcadores {
  constructor() {
    this.activos = {};
  }

  agregarMaracador(marcador) {
    this.activos[marcador.id] = marcador;
    return marcador;
  }

  removeMarcador(id) {
    delete this.activos[id];
  }

  actualizaMarcador(marcador) {
    this.activos[marcador.id] = marcador;
  }
}

module.exports = Marcadores;
