import type { FC } from "react";
import type { PostType } from "../../../../store/profileReducer";

import styles from "./Post.module.css";

type PostProps = PostType & {
  deletePost: (id: string) => void,
};

const Post: FC<PostProps> = ({ id, postText, likesCount, deletePost }) => {
  return (
    <div className={styles["post"]}>
      <div>
        {postText}
      </div>
      <div className={styles["post-data"]}>
        Likes: {likesCount}
      </div>
      <button className={styles["delete-post"]} onClick={() => deletePost(id)}>
        Delete
      </button>
    </div>
  );
};

export default Post;
