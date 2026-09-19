import { type FC } from "react";
import { type InjectedFormProps, Field, reduxForm } from "redux-form";
import styles from "./../Chat.module.css";

export type NewMessageFormData = {
  newMessageText: string
};

const SendNewMessageForm: FC<InjectedFormProps<NewMessageFormData>> = (props) => {
  return (
    <form className={styles["new-message-form"]} onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="new-message-text">New message</label>
        <Field
          component={"textarea"}
          id={"new-message-text"}
          className={"form-control"}
          name={"newMessageText"}
          placeholder={"Type your message here"}
        />
      </div>
      <div className="form-actions">
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm<NewMessageFormData>({ form: "newMessageForm" })(SendNewMessageForm);
