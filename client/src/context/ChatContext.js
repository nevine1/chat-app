"use client"
import { createContext, useState, useEffect } from 'react'
import { getRequest , baseUrl } from '@/utils/service';
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) =>{
    const [ userChats, setUserChats ] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  
   // Fetching the user chats when the component loads or the user changes
  useEffect(() => {
    const getUserChats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (user?._id) {
          // HTTP request
          const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
          if (response.error) {
            setError(response);
          } else {
            setUserChats(response);
          }
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUserChats();
  }, [user]);
    const chatContextValues={ userChats, isLoading, error, setUserChats }
    return (
        <ChatContext.Provider value={chatContextValues}>
            {children}
        </ChatContext.Provider>
    )
}