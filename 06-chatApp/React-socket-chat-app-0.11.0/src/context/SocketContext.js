import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectarSocket, desconnectarSocket } = useSocket(
    "http://localhost:8081"
  );
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) {
      connectarSocket();
    }
  }, [auth, connectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      desconnectarSocket();
    }
  }, [auth, desconnectarSocket]);

  //escuchar los cambios en los users cnectados
  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      dispatch({
        type: types.usuariosCargados,
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("mensaje-personal", (mensaje) => {
      // console.log(mensaje);
      //dispatch para actualizar el estado del mensaje enviado del chat personal
      dispatch({
        type: types.nuevoMensaje,
        payload: mensaje,
      });
      //mover el scroll al final
      scrollToBottomAnimated("mensajes");
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
