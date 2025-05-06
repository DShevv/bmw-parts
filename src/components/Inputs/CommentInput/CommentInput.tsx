"use client";
import clsx from "clsx";
import styles from "./CommentInput.module.scss";
import { Field } from "formik";

interface CommentInputProps {
  name: string;
  title?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CommentInput = ({
  name,
  title,
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

  if (title) {
    return (
      <div className={styles.wrapper}>
        {title && <div className={clsx("body-1", styles.title)}>{title}:</div>}
        <label className={clsx("t-placeholder", styles.container, className)}>
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
          {error && (
            <div className={clsx("body-4", styles.message)}>*{error}</div>
          )}
        </label>
      </div>
    );
  }

  return (
    <label className={clsx("t-placeholder", styles.container, className)}>
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
