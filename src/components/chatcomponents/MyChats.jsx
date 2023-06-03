import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "./ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";
import { ChatState } from "../../context/ChatProvider";
import { useAuthContext } from "../../context/AuthContext";
import { toastError } from "../../lib/toastify";
import { Button } from 'flowbite-react';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const { user } = useAuthContext();

  const userId = user._id


  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat`, { withCredentials: true });
      setChats(data);
    } catch (error) {
      toastError(error.message || 'Error fetching Chats');
    }
  };

  useEffect(() => {
    setLoggedUser({ user });
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div className=" p-3 items-center flex flex-col bg-blue-400 w-full md:w-1/3 rounded-lg border ">
      <div className="pb-3 pl-3 font-bold text-2xl flex w-full justify-between items-center">
        Chats
        
        <GroupChatModal> 
        <Button
          gradientDuoTone="pinkToOrange"
          outline
        >
          <p>
            Neue Gruppe 
          </p>
        </Button>
        </GroupChatModal>


      </div>
      <div className="flex flex-col p-3 bg-gray-200 w-full h-full rounded-lg overflow-y-hidden">
        {chats ? (
          <div className="overflow-y-scroll">
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer rounded-lg px-3 py-2 ${
                  selectedChat === chat ? "bg-blue-800  text-white" : "bg-gray-300 text-black"
                }`}
                key={chat._id}
              >
                <span>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </span>
                {chat.latestMessage && (
                  <p className="text-xs">
                    <b>{chat.latestMessage.sender.firstName}:   </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
      
};

export default MyChats;