import type { FC } from "react";
import type { PostsListProps } from "./PostListContainer";
import Post from "./Post/Post";

import styles from "./PostsList.module.css";
import NewPostForm, { type NewPostFormData } from "./NewPostForm/NewPostForm";

const PostsList: FC<PostsListProps> = ({
  postsData,
  addPost,
}) => {
  const handleAddPost = (formData: NewPostFormData) => {
    addPost(formData.newPostText);
  };

  return (
    <div className={styles["user-posts"]}>
      <h2>My Posts</h2>
      <div className={styles["new-post-section"]}>
        <NewPostForm onSubmit={handleAddPost} />
      </div>
      <div>
        <ul className={styles["posts-list"]}>
          {postsData.map(post =>
            <li key={post.id}>
              <Post {...post} />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PostsList;
