import { useState, useEffect } from "react";
import { getRequest, baseUrl } from "@/utils/service";

const ChatOfUser = ({ chat, user }) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user._id);

  useEffect(() => {
    if (!recipientId) return; // Exit if recipientId is undefined

    const getUserChat = async () => {
      console.log("Fetching user data for ID:", recipientId);
      const response = await getRequest(`${baseUrl}/users/${recipientId}`);
      console.log("API Response:", response); // Log the full API response

      if (response.error) {
        setError(response.error);
        return;
      }

      setRecipientUser(response.user);
      console.log("Recipient User Set:", response.user); // Log the updated state
    };

    getUserChat();
  }, [recipientId]);

  useEffect(() => {
    console.log("Updated recipientUser state:", recipientUser);
  }, [recipientUser]);

  console.log("Chat Members:", chat?.members);
  console.log("Current User ID:", user?._id);
  console.log("Recipient User ID:", recipientId);
  console.log("Recipient User:", recipientUser);

  return (
    <div>
      <h1>Chat is:</h1>
      {recipientUser ? (
        <p>Recipient: {recipientUser.name || "Name not available"}</p>
      ) : (
        <p>Loading recipient details...</p>
      )}
    </div>
  );
};

export default ChatOfUser;
