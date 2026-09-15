import type { ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import type { RootState } from "../../store/store";
import type { ChatType } from "../../store/messagesReducer";
import Messages from "./Messages";
import { withAuthRedirect } from "../../components/hoc/withAuthRedirect";

type MapStateToProps = {
  chats: Array<ChatType>,
  isAuth: boolean,
};

type MapDispatchToProps = {};

export type MessagesProps = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    isAuth: state.auth.isAuth,
    chats: state.messagesPage.chats,
  };
};

const mapDispatchToProps = (): MapDispatchToProps => {
  return {};
};

export default compose<ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
)(Messages);
