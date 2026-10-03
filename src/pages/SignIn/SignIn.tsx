import type { FC } from "react";
import { connect } from "react-redux";
import { type InjectedFormProps, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import type { RootState } from "../../store/store";
import { login } from "../../store/authReducer";
import { required } from "../../utils/validators";
import { createField, Input } from "../../components/common/FormControls/FormControls";
import styles from "./SignIn.module.css";

type SignInFormData = {
  email: string,
  password: string,
  rememberMe: boolean,
};

type MapStateToProps = {
  isAuth: boolean,
};

type MapDispatchToProps = {
  login: (email: string, password: string, rememberMe: boolean) => void
};

type SignInProps = MapStateToProps & MapDispatchToProps;

const SignInForm: FC<InjectedFormProps<SignInFormData>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles["signin-form"]}>
      {props.error && <div className={styles["form-error"]}>{props.error}</div>}
      {createField(Input, "email", "email", "Email", "email", [required])}
      {createField(Input, "password", "password", "Password", "password", [required])}
      {createField(Input, "checkbox", "remember-me", "Remember me", "checkbox", [])}
      <div className="form-actions">
        <button>Sign in</button>
      </div>
    </form>
  );
};

const SignInFormContainer = reduxForm<SignInFormData>({ form: "signInForm" })(SignInForm);

const SignIn: FC<SignInProps> = (props) => {
  const onSignInFormSubmit = (formData: SignInFormData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1 className={styles["page-title"]}>Sign in to DevsNet</h1>
      <SignInFormContainer onSubmit={onSignInFormSubmit} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(SignIn);
