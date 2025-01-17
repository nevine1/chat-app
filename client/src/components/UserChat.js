
"use client"
import { useState, useContext } from 'react'
import { ChatContext } from '@/context/ChatContext'
import { AuthContext } from '@/context/AuthContext'
import ChatOfUser from './ChatOfUser';
const UserChat = () => {

    const { user } = useContext(AuthContext);
   
    const { userChats, isLoading, error, setUserChats } = useContext(ChatContext);
  console.log("user chats are: ", userChats)

  return (

    <div className=" bg-gray-900 text-white flex flex-col  justify-center items-center h-[90%]">
      <div className="flex flex-row gap-16 text-white text-[22px] mt-10">
        <div>
          <h1>List </h1>
        </div>
        <div>
          <h1>Chat </h1>
        </div>
      </div>
      
      {
        userChats?.length < 1 ? null : (
          <div className="h-[50vh] bg-red-500 text-white p-10 m-8">
                    <h1>Here is the chatssssssssssssssssssssssssssssssssssssssss</h1>
                    { isLoading && <p>Chat is loading ....</p> }
                    <div className="p-10 m-6 h-[80vh] text-white">
                      { userChats?.map((chat, index) => (
                          <ChatOfUser chat={chat} user={user} key={index} />
                      ))}
                    </div>
                </div>
          )}
      </div>
  )
}

export default UserChat
