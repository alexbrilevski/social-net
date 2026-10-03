import { connect } from "react-redux";
import type { Dispatch } from "redux";
import type { RootAction, RootState } from "../../../store/store";
import { addNewPostAC, deletePostAC, type PostType } from "../../../store/profileReducer";
import PostsList from "./PostsList";

type MapStateToProps = {
  postsData: Array<PostType>,
};

type MapDispatchToProps = {
  addPost: (newPostText: string) => void,
  deletePost: (id: string) => void,
};

export type PostsListProps = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    postsData: state.profilePage.postsData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): MapDispatchToProps => {
  return {
    addPost: (newPostText: string) => {
      dispatch(addNewPostAC(newPostText));
    },
    deletePost: (id: string) => {
      dispatch(deletePostAC(id));
    },
  };
};

const PostListContainer = connect(mapStateToProps, mapDispatchToProps)(PostsList);

export default PostListContainer;
