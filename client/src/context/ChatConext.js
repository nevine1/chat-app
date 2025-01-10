import { createContext, useState, useEffect } from 'react'
import { getRequest } from '@/utils/service';
const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) =>{
    const [ userChats, setUserChats ] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //getting the user chats when loading the page; 
   /*  useEffect(() => {
        const getUserChats = async () =>{

            setIsLoading(true);

            try{
                const response = await getRequest(url);

                setIsLoading(false);
            }catch(err){
                setError(err.message)
            }
        }
    }, [user]) */
    const chatContextValues={userChats, isLoading, error}
    return (
        <ChatContext.Provider values={chatContextValues}>
            {children}
        </ChatContext.Provider>
    )
}