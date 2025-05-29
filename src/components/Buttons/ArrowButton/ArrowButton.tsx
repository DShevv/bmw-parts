import clsx from "clsx";
import styles from "./ArrowButton.module.scss";
import Link from "next/link";
import { SvgArrow } from "@/assets/icons/svgs";

interface ArrowButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "link";
  href?: string;
  name?: string;
}

const ArrowButton = ({
  onClick,
  disabled,
  children,
  className,
  type = "button",
  href,
  name,
}: ArrowButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link
        className={clsx("t-button", styles.button, className, {
          [styles.disabled]: disabled,
        })}
        href={href}
        onClick={onClick}
      >
        {children}
        <SvgArrow />
      </Link>
    );
  }

  return (
    <button
      className={clsx("t-button", styles.button, className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={name}
    >
      {children}
      <SvgArrow />
    </button>
  );
};

export default ArrowButton;
