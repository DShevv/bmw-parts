"use client";
import { Field } from "formik";
import styles from "./Checkbox.module.scss";
import clsx from "clsx";

interface CheckboxProps {
  onChange?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  name?: string;
  checked?: boolean;
}

const Checkbox = ({
  disabled,
  children,
  className,
  name,
  onChange,
  checked,
}: CheckboxProps) => {
  if (name) {
    return (
      <label className={clsx(styles.container, className)}>
        <Field
          type="checkbox"
          name={name}
          className={clsx(styles.input)}
          disabled={disabled}
        />

        <div className={styles.checkbox}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {children && <span className={"body-4"}>{children}</span>}
      </label>
    );
  }
  return (
    <label className={clsx(styles.container, className)}>
      <input
        type="checkbox"
        className={clsx(styles.input)}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
      />

      <div className={styles.checkbox}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M20 6L9 17L4 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {children && <span className={"body-4"}>{children}</span>}
    </label>
  );
};

export default Checkbox;
