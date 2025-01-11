
"use client"
import { useState, useContext } from 'react'
import { ChatContext } from '@/context/ChatContext'
const UserChat = () => {
    const { userChats, isLoading, error, setUserChats } = useContext(ChatContext);
    console.log("user Chats :", userChats)
  return (
    <div>
      <h1>Hello Chat </h1>
    </div>
  )
}

export default UserChat
