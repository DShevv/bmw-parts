"use client";
import clsx from "clsx";
import styles from "./InlineButton.module.scss";
import Link from "next/link";
import { SvgArrowCorner } from "@/assets/icons/svgs";

interface InlineButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "link";
  href?: string;
  isIcon?: boolean;
}

const InlineButton = ({
  onClick,
  disabled,
  children,
  className,
  type = "button",
  href,
  isIcon,
}: InlineButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link
        className={clsx("t-button", styles.button, className, {
          [styles.disabled]: disabled,
          [styles.isIcon]: isIcon,
        })}
        href={href}
      >
        <span>{children}</span>
        {isIcon && <SvgArrowCorner />}
      </Link>
    );
  }

  return (
    <button
      className={clsx("t-button", styles.button, className, {
        [styles.isIcon]: isIcon,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      {isIcon && <SvgArrowCorner />}
    </button>
  );
};

export default InlineButton;
