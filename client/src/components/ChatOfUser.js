import { useState, useEffect } from "react";
import { getRequest, baseUrl } from "@/utils/service";
import Image from "next/image";
import profile from '../assets/svg/profile.svg'
import { format } from 'date-fns'
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
    <div className="flex flex-row justify-between cursor-pointer">
      
      <div>
      { recipientUser ? (

          <div className="flex flex-row gap-1">
            <Image src={profile} alt="profile" height={20} width={20} />
            <p  className=" text-[15px] text-white">
              {recipientUser.name || "Name not available"}
            </p>
          </div>
          ) : (
          <p>Loading recipient details...</p>
          )
          }
      </div>

      <div className="flex flex-row gap-2 justify-evenly">
         <p className=" text-[15px] text-white">
         {chat?.createdAt ? format(chat.createdAt, 'dd MMM yyyy') : 'N/A'}
          </p> 
       
        <p className=" text-[15px] text-white">Notification</p>
        <p className=" text-[15px] text-white">online</p>
      </div> 
    </div>
  );
};

export default ChatOfUser;
