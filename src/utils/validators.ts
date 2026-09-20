type FieldValidator = (value: string) => string | undefined;

export const required: FieldValidator = (value: string) => {
  if (value) return undefined;
  return "Field is required";
};

export const setMinLength = (minLength: number): FieldValidator => (value) => {
  if (value.length < minLength) return `Min length is ${minLength} symbols`;
  return undefined;
};
