//instalacion mapbox:: npm i mapbox-gl --save
//<link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: -122.4725,
  lat: 37.801,
  zoom: 13.5,
};

export const MapaPage = () => {
  const {
    coords,
    setRef,
    nuevoMarcador$,
    movimientoMarcador$,
    agregarMarcador,
    actualizarPosicion,
  } = useMapbox(puntoInicial);
  const { socket } = useContext(SocketContext);
  //Escuchar los marcadores existentes
  useEffect(() => {
    socket.on("marcadores-activos", (marcadores) => {
      // console.log(marcadores);
      for (const key of Object.keys(marcadores)) {
        // console.log(marcadores[key]);
        agregarMarcador(marcadores[key], key);
      }
    });
  }, [socket, agregarMarcador]);
  //Nuevo marcador
  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      socket.emit("marcador-nuevo", marcador);
    });
  }, [nuevoMarcador$, socket]);
  //movimiento del marcador
  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {
      // console.log(marcador);
      socket.emit("marcador-actualizado", marcador);
    });
  }, [socket, movimientoMarcador$]);

  //Mover marcador mediante sockets
  useEffect(() => {
    socket.on("marcador-actualizado", (marcador) => {
      actualizarPosicion(marcador);
    });
  }, [socket, actualizarPosicion]);

  //Escuchar nuevos marcadores
  useEffect(() => {
    socket.on("marcador-nuevo", (marcador) => {
      // console.log(marcador);

      agregarMarcador(marcador, marcador.id);
    });
  }, [socket, agregarMarcador]);

  return (
    <>
      <div className="info">
        Lng:{coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
