import type { FC } from "react";
import type { MessagesProps } from "./MessagesContainer";
import Chats from "./Chats/Chats";
import ChatContainer from "./Chat/ChatContainer";
import styles from "./Messages.module.css";

const Messages: FC<MessagesProps> = ({ chats }) => {
  return (
    <div className={styles["messages-page-content"]}>
      <Chats chats={chats} />
      <ChatContainer />
    </div>
  );
};

export default Messages;
