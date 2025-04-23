import clsx from "clsx";
import styles from "./MenuButton.module.scss";
import Link from "next/link";
import { SvgBurger } from "@/assets/icons/svgs";
import { forwardRef } from "react";

interface MenuButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "link";
  href?: string;
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    const {
      onClick,
      disabled,
      children,
      className,
      type = "button",
      href,
    } = props;

    if (type === "link" && href) {
      return (
        <Link
          className={clsx("t-button", className, styles.button, {
            [styles.disabled]: disabled,
          })}
          href={href}
          onClick={onClick}
        >
          <SvgBurger />

          {children && <div>{children}</div>}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={clsx("t-button", className, styles.button, {
          [styles.disabled]: disabled,
        })}
        onClick={onClick}
      >
        <SvgBurger />

        {children && <div>{children}</div>}
      </button>
    );
  }
);

MenuButton.displayName = "MenuButton";

export default MenuButton;
