import type { FC } from "react";
import { type InjectedFormProps, Field, reduxForm } from "redux-form";
import type { LoginData } from "../../api/api";
import { Input } from "../../components/common/FormControls/FormControls";
import styles from "./SignIn.module.css";

type SignInProps = {
  sendLoginData: (signInFormData: LoginData) => void,
};

const SignInForm: FC<InjectedFormProps<LoginData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles["signin-form"]}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Field
          component={Input}
          id={"email"}
          name={"email"}
          type={"email"}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field
          component={Input}
          id={"password"}
          name={"password"}
          type={"password"}
        />
      </div>
      <div className="form-group form-group-checkbox">
        <Field
          component={"input"}
          id={"remember-me"}
          name={"rememberMe"}
          type={"checkbox"}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <div className="form-actions">
        <button>Sign in</button>
      </div>
    </form>
  );
};

const SignInFormContainer = reduxForm<LoginData>({ form: "signInForm" })(SignInForm);

export const SignIn: FC<SignInProps> = (props) => {
  const onSignInFormSubmit = (formData: LoginData) => {
    const loginData = {
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe
    };
    props.sendLoginData(loginData);
  };

  return (
    <div>
      <h1 className={styles["page-title"]}>Sign in to DevsNet</h1>
      <SignInFormContainer onSubmit={onSignInFormSubmit} />
    </div>
  );
};
