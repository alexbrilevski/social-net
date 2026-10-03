import type { FC, ReactNode } from "react";
import { Field, type WrappedFieldMetaProps, type WrappedFieldProps } from "redux-form";
import type { FieldValidator } from "../../../utils/validators";
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

export const createField = <FormKeysType extends string>(
  component: FC<WrappedFieldProps>,
  name: FormKeysType,
  id: string | undefined,
  label: string | undefined,
  type: string | undefined,
  validators: Array<FieldValidator>,
  props = {},
) => {
  return (
    <div className={`${s["form-group"]} ${type === "checkbox" ? s["form-group-checkbox"] : ""}`}>
      {label && id && type !== "checkbox" && <label htmlFor={id}>{label}</label>}
      <Field
        component={component}
        id={id}
        name={name}
        type={type}
        validate={validators}
        {...props}
      />
      {label && id && type === "checkbox" && <label htmlFor={id}>{label}</label>}
    </div>
  );
};
