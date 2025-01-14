
"use client"
import { useState, useContext } from 'react'
import { ChatContext } from '@/context/ChatContext'
import { AuthContext } from '@/context/AuthContext'
import ChatOfUser from './ChatOfUser';
const UserChat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isLoading, error, setUserChats } = useContext(ChatContext);
    console.log("user Chats :", userChats)

  return (

    <div className=" bg-gray-900 text-white flex flex-col  justify-center items-center h-[90%]">
      <div className="flex flex-row gap-10 text-white text-[22px] mt-10">
        <div>
          <h1>List </h1>
        </div>
        <div>
          <h1>Chat </h1>
        </div>
      </div>
      

      <div>
      {
        userChats?.length < 1 ? null : (
        
          userChats.map((chat, index) =>(
            <ChatOfUser chat={chat} user={user}/>

        )
          ))
          
      }
      </div>
    </div>
  )
}

export default UserChat
