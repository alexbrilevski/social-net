import { type FC } from "react";
import { type InjectedFormProps, Field, reduxForm } from "redux-form";
import styles from "./../PostsList.module.css";
import { Textarea } from "../../../../components/common/FormControls/FormControls";
import { required, setMinLength } from "../../../../utils/validators";

export type NewPostFormData = {
  newPostText: string,
};

const NewPostForm: FC<InjectedFormProps<NewPostFormData>> = (props) => {
  return (
    <form className={styles["new-post-form"]} onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="new-post-text">New post</label>
        <Field
          component={Textarea}
          id={"new-post-text"}
          name={"newPostText"}
          placeholder={"Type your post here"}
          validate={[required, setMinLength(10)]}
        />
      </div>
      <div className="form-actions">
        <button>Add new post</button>
      </div>
    </form>
  );
};

export default reduxForm<NewPostFormData>({ form: "newPostForm" })(NewPostForm);
