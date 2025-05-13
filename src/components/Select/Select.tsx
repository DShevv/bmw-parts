"use client";
import clsx from "clsx";
import styles from "./Select.module.scss";
import { SvgArrow } from "@/assets/icons/svgs";
import { useRef, useState } from "react";
import useOutsideClick from "@/utils/useOutsideClick";

interface SelectProps {
  defaultValue: string;
  options: string[];
  onChange?: (value: string) => void;
  className?: string;
  direction?: "top" | "bottom";
}

const Select = ({
  defaultValue,
  options,
  onChange,
  className,
  direction = "bottom",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div
      ref={ref}
      className={clsx(styles.container, { [styles.active]: isOpen }, className)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={clsx("t-placeholder", styles.header)}>
        <span>{selectedOption}</span>

        <SvgArrow />
      </div>

      <div
        className={clsx(styles.options, {
          [styles.top]: direction === "top",
        })}
      >
        <div className={styles.inner}>
          {options
            .filter((option) => option !== selectedOption)
            .map((option) => (
              <div
                className={clsx("t-placeholder", styles.option)}
                key={option}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                  onChange?.(option);
                }}
              >
                {option}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
