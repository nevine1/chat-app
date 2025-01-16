import { useState, useEffect , useContext} from 'react'
import { getRequest , baseUrl} from '@/utils/service';
const ChatOfUser = ({chat, user}) => {
  const [ recipientUser, setRecipientUser ] = useState({});
    const [error , setError] = useState(null);
    
    const recipientId = chat?.members.find((id) => id != user._id);
    console.log(" recipient User id: ",recipientId)

    useEffect(() =>{

      const getUserChat = async () =>{
        const response = await getRequest(`${baseUrl}/users/${recipientId}`);

        if(response.error ) return 

        setRecipientUser(response.user);

        console.log("response is ",response)
      }

      getUserChat();

    }, [recipientId])

  console.log(recipientUser)
  console.log("chat details is :", chat)

  useEffect(() => {
    console.log("Updated recipient user:", recipientUser);
  }, [recipientUser]);
  return (
    <div>
    <h1>Chat is:</h1>
    {recipientUser ? (
      <p>Recipient: {recipientUser.name}</p>
    ) : (
      <p>Loading recipient details...</p>
    )}
  </div>
  )
}

export default ChatOfUser
