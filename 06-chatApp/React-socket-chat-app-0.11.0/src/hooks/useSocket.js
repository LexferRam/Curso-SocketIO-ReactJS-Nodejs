import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  //estas fns solo se vuelve a generar si el argumento cambia
  const connectarSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true, //cada vez que se llame a "connectarSocket" se crea una nueva conexion
      query: {
        "x-token": token, //pasa el token por la url
      },
    });

    setSocket(socketTemp);
  }, [serverPath]);

  const desconnectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  console.log(socket);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
    connectarSocket,
    desconnectarSocket,
  };
};
