"use client";
import clsx from "clsx";
import styles from "./CheckboxFilter.module.scss";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SvgArrowFilter } from "@/assets/icons/svgs";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import { useDebounce } from "@/utils/useDebounce";

interface CheckboxFilterProps {
  name: string;
  title: string;
  disabled?: boolean;
  data: string[];
}

const CheckboxFilter = ({
  name,
  title,
  disabled = false,
  data,
}: CheckboxFilterProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const value = params.get(name);
  const [filterValue, setFilterValue] = useState<string[]>(
    value ? value.split(",") : []
  );
  const debouncedFilterValue = useDebounce(filterValue, 2000);
  const router = useRouter();
  const pathname = usePathname();
  const [isActive, setActive] = useState(
    disabled ? false : filterValue.length > 0
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    console.log(value);
    if (value) {
      setFilterValue(value.split(","));
      setActive(true);
    } else {
      setFilterValue([]);
      setActive(false);
    }
  }, [value]);

  useEffect(() => {
    router.push(
      pathname + "?" + createQueryString(name, debouncedFilterValue.join(",")),
      { scroll: false }
    );
  }, [debouncedFilterValue]);

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

      <AnimatePresence>
        {isActive && (
          <m.div
            className={clsx(styles.items)}
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {data.map((elem, index) => (
              <Checkbox
                key={index}
                onChange={() => {
                  if (filterValue.includes(elem)) {
                    setFilterValue((prev) =>
                      prev.filter((item) => item !== elem)
                    );
                  } else {
                    setFilterValue((prev) => [...prev, elem]);
                  }
                }}
                checked={filterValue.includes(elem)}
                className={styles.checkbox}
              >
                {elem}
              </Checkbox>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckboxFilter;
