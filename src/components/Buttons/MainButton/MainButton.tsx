import clsx from "clsx";
import styles from "./MainButton.module.scss";
import Link from "next/link";

interface MainButtonProps {
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "link" | "submit";
  href?: string;
  style?: "primary" | "secondary" | "light";
}

const MainButton = ({
  onClick,
  disabled,
  children,
  className,
  type = "button",
  href,
  style = "primary",
}: MainButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link
        className={clsx("t-button", styles.button, className, {
          [styles.disabled]: disabled,
          [styles.secondary]: style === "secondary",
        })}
        href={href}
        onClick={onClick}
      >
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      className={clsx("t-button", styles.button, className, {
        [styles.secondary]: style === "secondary",
        [styles.light]: style === "light",
      })}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default MainButton;
