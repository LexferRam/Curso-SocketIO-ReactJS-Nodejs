import { useCallback, useEffect, useRef, useState } from "react";
//useCallback memoriza un resultado de un callback para no volver a ejecutarlo, solo se ejecuta si cambia su valor de acuerdo a su dependencia
import mapboxgl from "mapbox-gl";
import { v4 } from "uuid";
import { Subject } from "rxjs";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGV4ZmVyIiwiYSI6ImNrbmV6M2o4NjBobm4ydXFxaHM1bTN3NHMifQ.sbkRkq6czrNEUYU13vg3Cg";

export const useMapbox = (puntoInicial) => {
  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  }, []);

  //Referencia a los marcadores
  const marcadores = useRef({});

  //Observables de Rxjs
  const movimientoMarcador = useRef(new Subject());
  //se usa useRef() porq no queremos que el componente no se vuelva a generar cuando se renderice
  const nuevoMarcador = useRef(new Subject());

  //Mapa y coords
  const mapa = useRef();
  const [coords, setCoords] = useState(puntoInicial);

  //funcion para agregar marcadores
  const agregarMarcador = useCallback((ev, id) => {
    const { lng, lat } = ev.lngLat || ev;

    const marker = new mapboxgl.Marker();
    marker.id = id ?? v4(); //si no viene el id se crea usando v4()

    marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);

    marcadores.current[marker.id] = marker;

    //Si el marcador tiene ID no emitir
    if (!id) {
      nuevoMarcador.current.next({
        id: marker.id,
        lng,
        lat,
      });
    }

    //escuchar el movimiento del marcador
    marker.on("drag", ({ target }) => {
      const { id } = target;
      const { lng, lat } = target.getLngLat();
      // console.log(lng, lat);
      movimientoMarcador.current.next({ id, lng, lat });
    });
  }, []);

  //funcion para actualizar la ubocacion del marcador
  const actualizarPosicion = useCallback(({ id, lng, lat }) => {
    marcadores.current[id].setLngLat([lng, lat]);
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });
    mapa.current = map;
  }, [puntoInicial]);

  useEffect(() => {
    mapa.current?.on("move", () => {
      const { lng, lat } = mapa.current.getCenter();
      setCoords({
        lng: lng.toFixed(4), //toFixed(4) para indicar 4 decimales
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      });
    });
  }, []);

  //Agregar marcadores cuando hacemos click
  useEffect(() => {
    mapa.current?.on("click", agregarMarcador);
  }, [agregarMarcador]);

  return {
    agregarMarcador,
    actualizarPosicion,
    coords,
    marcadores,
    nuevoMarcador$: nuevoMarcador.current,
    movimientoMarcador$: movimientoMarcador.current,
    setRef,
  };
};
