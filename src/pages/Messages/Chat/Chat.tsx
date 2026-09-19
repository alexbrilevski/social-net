import type { FC } from "react";
import type { ChatProps } from "./ChatContainer";
import Message from "./Message/Message";
import type { NewMessageFormData } from "./NewMessageForm/NewMessageForm";
import styles from "./Chat.module.css";
import NewMessageForm from "./NewMessageForm/NewMessageForm";

const Chat: FC<ChatProps> = (props) => {
  const chatId = "c1";
  const authUserId = "u0";
  const messagesData = props.messagesData[chatId];
  const messages = messagesData.messages;

  const handleSendMessage = (formData: NewMessageFormData) => {
    props.sendMessage(chatId, authUserId, formData.newMessageText);
  };

  return (
    <div className={styles["chat"]}>
      <div className={styles["messages"]}>
        {messages.map(message => (
          <Message
            key={message.id}
            authUserId={authUserId}
            {...message}
          />
        ))}
      </div>
      <NewMessageForm onSubmit={handleSendMessage} />
    </div>
  );
};

export default Chat;
