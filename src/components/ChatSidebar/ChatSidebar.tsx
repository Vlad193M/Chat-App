import defaultAvatar from "../../assets/default-avatar2.jpg";
import ChatItem from "../ChatItem/ChatItem";
import ChatHeader from "../SidebarHeader/SidebarHeader";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import {
  setChatId,
  setChatType,
} from "../../store/chat-messages/chat-messages-slice";
import { subscribeToUserChats } from "../../store/user-chats/user-chats-actions";
import { ChatType } from "../../types/dbTypes";
import classes from "./ChatSidebar.module.css";

interface ChatSidebarProps {
  className: string;
}

const ChatSidebar = ({ className = "" }: ChatSidebarProps) => {
  const [show, setShow] = useState("");
  const chats = useAppSelector((state) => state.userChats.chats);
  const chatsLoading = useAppSelector((state) => state.userChats.loading);
  const chatId = useAppSelector((state) => state.chatMessages.chatId);
  const user = useAppSelector((state) => state.auth.user);
  const chatMessagesLoading = useAppSelector(
    (state) => state.chatMessages.loading
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = dispatch(subscribeToUserChats(user.uid));

    return () => unsubscribe();
  }, [user]);

  const handleChatSelect = (newChatId: string, chatType: ChatType) => {
    if (chatId === newChatId && !chatMessagesLoading) {
      dispatch(setChatId(null));
      return;
    }
    setShow("");
    dispatch(setChatId(newChatId));
    dispatch(setChatType(chatType));
  };

  return (
    <aside className={`${classes.aside} ${className}`}>
      <ChatHeader show={show} setShow={setShow} />
      <ClipLoader
        cssOverride={{
          position: "absolute",
          left: "50%",
          top: "5rem",
        }}
        size={16}
        color="#363f54"
        loading={chatsLoading}
      />
      <ul className={classes.ul}>
        {chats.map((chat) => (
          <ChatItem
            chatId={chat.chatId}
            selectedChatId={chatId}
            onClick={() => handleChatSelect(chat.chatId, chat.chatType)}
            src={chat.photoURL ?? defaultAvatar}
            name={chat.name}
            text={chat.lastMessage}
            updatedAt={chat.updatedAt}
            className={classes.li}
            key={chat.chatId}
          />
        ))}
      </ul>
    </aside>
  );
};

export default ChatSidebar;
