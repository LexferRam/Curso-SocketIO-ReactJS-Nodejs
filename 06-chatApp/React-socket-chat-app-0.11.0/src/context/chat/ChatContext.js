import React, { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext();
const initialState = {
  uid: "",
  chatActivo: null, //uid del usuario al que yo quiero enviar mensajes
  usuarios: [], //todos los users de la BDs
  mensajes: [], //chat seleccionado
};

export const ChatProvider = ({ children }) => {
  //chatState, dispatch ==> son los parametros que recibe la fn chatReducer
  //initialState s el valor inicial de chatState
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
