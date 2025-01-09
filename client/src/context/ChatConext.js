import { createContext, useState, useEffect } from 'react'
import { getRequest } from '@/utils/service';
const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) =>{
    const [ userChat, setUserChat ] = useState([])
    return (
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    )
}