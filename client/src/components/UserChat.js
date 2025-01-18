
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
      <div className="flex flex-row  gap-6 text-white text-[22px] mt-10 w-[80vw]">
        <div className="h-[90vh] w-[50%] bg-red-500  p-10 ">
          <h1>List </h1>
        </div>
        
      
      <div className="h-[90vh] w-[50%] bg-red-500  p-5 ">
      {
        userChats?.length < 1 ? null : (
          <>         
            { isLoading && <p>Chat is loading ....</p> }

              <div className="p-2  text-white ">

                { userChats?.map((chat, index) => (

                  <ChatOfUser chat={chat} user={user} key={index} />

                ))}

              </div>
            </>
          )}
          </div>
        </div>
      </div>
  )
}

export default UserChat
