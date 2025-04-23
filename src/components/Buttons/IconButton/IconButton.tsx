import clsx from "clsx";
import styles from "./IconButton.module.scss";
import Link from "next/link";
import { SvgArrowCorner } from "@/assets/icons/svgs";

interface IconButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "link";
  href?: string;
}

const IconButton = ({
  onClick,
  disabled,
  children,
  className,
  type = "button",
  href,
}: IconButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link
        className={clsx("t-button", styles.button, className, {
          [styles.disabled]: disabled,
        })}
        href={href}
        onClick={onClick}
      >
        <span>{children}</span>
        <SvgArrowCorner />
      </Link>
    );
  }

  return (
    <button
      className={clsx("t-button", styles.button, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      <SvgArrowCorner />
    </button>
  );
};

export default IconButton;
