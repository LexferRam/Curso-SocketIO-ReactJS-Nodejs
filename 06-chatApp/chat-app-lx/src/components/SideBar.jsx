import React from 'react'
import SideChatItem from './SideChatItem'

function SideBar() {

    const chats = [1,2,3,4,5,6,7,8,9,10]

    return (
         <div className="inbox_chat">

           {
               chats.map(chat => (
                   <SideChatItem key={chat} />
               ))
           }

             {/* <!-- Espacio extra para scroll --> */}
             <div className="extra_space"></div>


         </div>
    )
}

export default SideBar
