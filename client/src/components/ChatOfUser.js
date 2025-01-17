import { useState, useEffect } from "react";
import { getRequest, baseUrl } from "@/utils/service";

const ChatOfUser = ({ chat, user }) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
console.log("chat is ",chat)
  const recipientId = chat?.members.find((id) => id !== user._id); //getting the id for the other one who is chatting with the logged in user 

  useEffect(() => {
    if (!recipientId) return; 

    const getUserChat = async () => {
     
      const response = await getRequest(`${baseUrl}/users/${recipientId}`);
      console.log("API Response:", response); 

      if (response.error) {
        setError(response.error);
        return;
      }

      setRecipientUser(response.user);
      console.log("Recipient User Set:", response.user); 
    };

    getUserChat();
  }, [recipientId]);

  useEffect(() => {
    console.log("Updated recipientUser state:", recipientUser);
  }, [recipientUser]);

 
  console.log("Recipient User ID:", recipientId);
  console.log("Recipient User:", recipientUser);

  return (
    <div className="flex flex-row gap-10  ">
      
      <div>
      { recipientUser ? (

          <p>{recipientUser.name || "Name not available"}</p>
          ) : (
          <p>Loading recipient details...</p>
          )
          }
      </div>
      <div>
        <p className="text-right text-[14px] text-white">{chat?.createdAt}</p>
      </div> 
    </div>
  );
};

export default ChatOfUser;
