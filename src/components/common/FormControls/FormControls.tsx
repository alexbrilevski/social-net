import type { FC, ReactNode } from "react";
import type { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import s from "./FormControls.module.css";

type FormControlsProps = {
  meta: WrappedFieldMetaProps,
  children?: ReactNode,
}

const FormControl: FC<FormControlsProps> = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;

  return (
    <div className={`${s["form-control"]} ${hasError ? s["error"] : ""}`}>
      {children}
      {hasError && <span className={s["error-message"]}>{error}</span>}
    </div>
  );
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>;
};

export const Input: FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return <FormControl {...props}><input {...input} {...restProps} /></FormControl>;
};
