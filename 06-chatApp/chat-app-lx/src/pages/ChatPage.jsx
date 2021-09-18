import React from 'react'
import '../css/chat.css'
import InboxPeople from '../components/InboxPeople'
import Messages from '../components/Messages'
import ChatSelect from '../components/ChatSelect'

function ChatPage() {
    return (
        <div className="messaging">
        <div className="inbox_msg">

           <InboxPeople />

           <ChatSelect />
           {/* <Messages /> */}

        </div>


    </div>
    )
}

export default ChatPage
