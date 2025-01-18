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
    const [potentialChat, setPotentialChat] = useState([])

  //creating new chat ; 
  useEffect(() =>{
    const getUsers = async () =>{
      const response await getRequest(`${baseUrl}/users`);
      if(response.error){
        setError(response.error);
        console.log("getting users error", response.error);
        return 
      }
      
      // to create a chat between 2 persons
      const pChats = response.filter((u) =>{

        let isChatCreated = false;
        if(user._id === u._id) return false //if this user is currently logged in 
        
        //check is the u is included in the chat created or not 
        if(userChats){
          
          isChatCreated = setUserChats.some((chat) =>{
            return chat?.members[0] === u._id || chat?.member[1] === u._id //return chat created true
            //it means the first chat member is chatting or the second member
            //if this piece of code returned false , it means there is no chat created with this particular person;
            return !isChatCreated; 
          })
        

      });
      return potentialChat(pChats);
    }
  },[ userChats ])

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
    const chatContextValues={ userChats, isLoading, error, setUserChats, potentialChat, setPotentialChat }
    return (
        <ChatContext.Provider value={chatContextValues}>
            {children}
        </ChatContext.Provider>
    )
}