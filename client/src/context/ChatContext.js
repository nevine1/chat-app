"use client"
import { createContext, useState, useEffect , useContext} from 'react'
import { getRequest , baseUrl } from '@/utils/service';
import { AuthContext } from './AuthContext';
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) =>{
  const {user} = useContext(AuthContext)
    const [ userChats, setUserChats ] = useState([])
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
          console.log("response is :",response);
          console.log("user is is", user?._id)
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
  
  /* console.log("user email is", user.email) */
  console.log("userChats", userChats);
    const chatContextValues={ userChats, isLoading, error, setUserChats }
    return (
        <ChatContext.Provider value={chatContextValues}>
            {children}
        </ChatContext.Provider>
    )
}