import { connect } from "react-redux";
import type { Dispatch } from "redux";
import type { RootAction, RootState } from "../../../store/store";
import { sendNewMessageToChatAC, type Messages } from "../../../store/messagesReducer";
import Chat from "./Chat";

type MapStateToProps = {
  chatId?: string,
  messagesData: Messages,
};

type MapDispatchToProps = {
  sendMessage: (chatId: string, authUserId: string, newMessageText: string) => void,
};

export type ChatProps = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    messagesData: state.messagesPage.messages,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): MapDispatchToProps => {
  return {
    sendMessage: (chatId: string, authUserId: string, newMessageText: string) => {
      dispatch(sendNewMessageToChatAC(chatId, authUserId, newMessageText));
    },
  };
};

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default ChatContainer;
