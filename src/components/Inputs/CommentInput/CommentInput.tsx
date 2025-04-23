"use client";
import clsx from "clsx";
import styles from "./CommentInput.module.scss";
import { Field } from "formik";

interface CommentInputProps {
  title?: string;
  name: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CommentInput = ({
  title,
  name,
  placeholder,
  error,
  disabled,
  className,
  value,
  onChange,
  ...other
}: CommentInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <label className={clsx("t-placeholder", styles.container)}>
      <div className={clsx("body-4", styles.title)}>{title}</div>

      <Field
        className={clsx(
          "t-placeholder",
          styles.field,
          { [styles.error]: error },
          className
        )}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        component="textarea"
        value={value}
        onChange={handleChange}
        {...other}
      ></Field>
      {error && <div className={clsx("body-4", styles.message)}>*{error}</div>}
    </label>
  );
};

export default CommentInput;
