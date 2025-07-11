"use client";
import clsx from "clsx";
import styles from "./Select.module.scss";
import { SvgArrow } from "@/assets/icons/svgs";
import { useRef, useState, useEffect } from "react";
import useOutsideClick from "@/utils/useOutsideClick";

interface SelectProps {
  defaultValue: { title: string; value: string };
  options: { title: string; value: string }[];
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

  // Синхронизируем selectedOption с defaultValue при его изменении
  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div
      ref={ref}
      className={clsx(styles.container, { [styles.active]: isOpen }, className)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={clsx("t-placeholder", styles.header)}>
        <span>{selectedOption?.title}</span>

        <SvgArrow />
      </div>

      <div
        className={clsx(styles.options, {
          [styles.top]: direction === "top",
        })}
      >
        <div className={styles.inner}>
          {options
            .filter((option) => option.value !== selectedOption?.value)
            .map((option) => (
              <div
                className={clsx("t-placeholder", styles.option)}
                key={option.value}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                  onChange?.(option.value);
                }}
              >
                {option.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
