import {
  messagesReducer,
  type MessagesPage,
  sendNewMessageToChatAC,
} from "./messagesReducer";

let state: MessagesPage;

beforeEach(() => {
  state = {
    chats: [
      { id: "c1", userId: "u1", name: "User1" },
      { id: "c2", userId: "u2", name: "User2" },
    ],
    messages: {
      "c1": {
        messages: [
          { id: "m1", userId: "u1", text: "Hi!" },
          { id: "m2", userId: "u0", text: "Hello!" },
          { id: "m3", userId: "u1", text: "How's things?" },
        ],
      },
      "c2": {
        messages: [{ id: "m1", userId: "u0", text: "Yo!" }],
      },
    },
  };
});

test("New message should be immutably added", () => {
  const chatId = "c1";
  const userId = "u0";
  const newMessageText = "Hello world!";
  const action = sendNewMessageToChatAC(chatId, userId, newMessageText);

  const newState = messagesReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.messages[chatId].messages.length).toBe(4);
  expect(newState.messages[chatId].messages[3].id).toBe(action.newMessageId);
});
