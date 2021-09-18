import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SidebarChatItem } from "./SidebarChatItem";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  console.log(chatState);

  return (
    <div className="inbox_chat">
      {chatState.usuarios
        .filter((usuario) => usuario.uid !== auth.uid)
        .map((usuario) => (
          <SidebarChatItem usuario={usuario} key={usuario.uid} />
        ))}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
