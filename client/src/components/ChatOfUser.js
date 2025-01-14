import React from 'react'

const ChatOfUser = ({chat}) => {
  return (
    <div key={chat.id || index} chat={chat}>
       <h1>{chat.members}</h1>
    </div>
  )
}

export default ChatOfUser
