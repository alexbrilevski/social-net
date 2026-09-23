import { generateId } from "../utils/helpers";

const DUMMY_CHATS = [
  { id: "c1", userId: "u1", name: "Karina" },
  { id: "c2", userId: "u2", name: "Sergei" },
  { id: "c3", userId: "u3", name: "Nastya" },
];

const DUMMY_MESSAGES = {
  "c1": {
    messages: [
      { id: "m1", userId: "u1", text: "Hi!" },
      { id: "m2", userId: "u0", text: "Hello!" },
      { id: "m3", userId: "u1", text: "How's things?" },
    ],
  },
  "c2": {
    messages: [
      { id: "m1", userId: "u0", text: "Yo!" },
    ],
  },
  "c3": {
    messages: [
      { id: "m1", userId: "u3", text: "What's up?" },
    ],
  },
};

const MESSAGES_ACTION_TYPES = {
  SEND_NEW_MESSAGE_TO_CHAT: "messages/SEND-NEW-MESSAGE-TO-CHAT",
} as const;

export type ChatType = {
  id: string,
  userId: string,
  name: string,
};

export type MessageType = {
  id: string,
  userId: string,
  text: string,
};

export type Messages = {
  [chatId: string]: {
    messages: Array<MessageType>,
  },
};

export type MessagesPage = {
  chats: Array<ChatType>,
  messages: Messages,
};

export type MessagesAction =
  | ReturnType<typeof sendNewMessageToChatAC>;

const initState = {
  chats: DUMMY_CHATS,
  messages: DUMMY_MESSAGES,
};

export const messagesReducer = (state: MessagesPage = initState, action: MessagesAction): MessagesPage => {
  switch (action.type) {
    case MESSAGES_ACTION_TYPES.SEND_NEW_MESSAGE_TO_CHAT: {
      const newMessage: MessageType = {
        id: action.newMessageId,
        userId: action.userId,
        text: action.text,
      };

      return {
        ...state,
        messages: {
          ...state.messages,
          [action.chatId]: {
            messages: [...state.messages[action.chatId].messages, newMessage],
          }
        }
      };
    }
    default: {
      return state;
    }
  }
};

export const sendNewMessageToChatAC = (chatId: string, userId: string, text: string) => {
  const newMessageId = generateId();
  return { type: MESSAGES_ACTION_TYPES.SEND_NEW_MESSAGE_TO_CHAT, newMessageId, chatId, userId, text };
};
