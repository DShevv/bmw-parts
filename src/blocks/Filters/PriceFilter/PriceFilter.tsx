"use client";
import clsx from "clsx";
import styles from "./PriceFilter.module.scss";
import { useCallback, useEffect, useState } from "react";
import { motion as m } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PricePicker from "@/components/Inputs/PricePicker/PricePicker";
import { SvgArrowFilter } from "@/assets/icons/svgs";

interface PriceFilterProps {
  name: string;
  title: string;
  disabled?: boolean;
  maxPrice: number | null;
  minPrice: number | null;
}

const PriceFilter = ({
  name,
  title,
  disabled = false,
  maxPrice,
  minPrice,
}: PriceFilterProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const value = params.get(name);
  const router = useRouter();
  const pathname = usePathname();
  const [isActive, setActive] = useState(disabled ? false : value !== null);

  useEffect(() => {
    setActive(disabled ? false : value !== null);
  }, [value]);

  const createQueryString = useCallback(
    (name: string, value?: string, resetPage = false) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      // Сбрасываем page только при изменении фильтра пользователем
      if (resetPage) {
        params.delete("page");
      }

      return params.toString();
    },
    [searchParams]
  );

  if (!maxPrice) {
    return null;
  }

  return (
    <div
      className={clsx(
        styles.filter,
        { [styles.active]: isActive },
        { [styles.disabled]: disabled }
      )}
    >
      <div
        className={clsx("body-1", styles.title)}
        onClick={() => {
          setActive(!disabled && !isActive);
        }}
      >
        {title}
        <SvgArrowFilter
          className={clsx(styles.arrow, { [styles.active]: isActive })}
        />
      </div>

      <m.div
        className={clsx(styles.items)}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <PricePicker
          key={value || "empty"} // Принудительно перерендерим PricePicker при изменении value
          initialValue={value ? value.split("-").map(Number) : undefined}
          maxPrice={Number(maxPrice)}
          minPrice={Number(minPrice)}
          onChange={(values: [number, number]) => {
            if (values[0] === 0 && values[1] === Number(maxPrice)) {
              router.push(
                pathname + "?" + createQueryString(name, undefined, true),
                {
                  scroll: false,
                }
              );
            } else {
              router.push(
                pathname +
                  "?" +
                  createQueryString(name, `${values[0]}-${values[1]}`, true),
                { scroll: false }
              );
            }
          }}
        />
      </m.div>
    </div>
  );
};

export default PriceFilter;
