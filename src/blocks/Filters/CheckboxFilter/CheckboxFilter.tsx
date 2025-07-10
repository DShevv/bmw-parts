"use client";
import clsx from "clsx";
import styles from "./CheckboxFilter.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SvgArrowFilter } from "@/assets/icons/svgs";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import { useDebounce } from "@/utils/useDebounce";

interface CheckboxFilterProps {
  name: string;
  title: string;
  disabled?: boolean;
  data: { title: string; value: string }[];
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
  const initialValue = disabled ? [] : value ? value.split(",") : [];
  const [filterValue, setFilterValue] = useState<string[]>(initialValue);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const debouncedFilterValue = useDebounce(filterValue, 500);
  const router = useRouter();
  const pathname = usePathname();
  const [isActive, setActive] = useState(
    disabled ? false : initialValue.length > 0
  );
  const lastUrlValue = useRef<string | null>(value);

  // Синхронизируем значения только при изменении URL извне (не пользователем)
  useEffect(() => {
    // Обновляем состояние только если URL изменился извне
    if (value !== lastUrlValue.current) {
      const currentValue = disabled ? [] : value ? value.split(",") : [];
      setFilterValue(currentValue);
      setActive(disabled ? false : currentValue.length > 0);
      lastUrlValue.current = value;
      // Сбрасываем флаг взаимодействия при изменении URL извне
      setHasUserInteracted(false);
    }
  }, [value, disabled]);

  // Обновляем isActive при изменении filterValue пользователем
  useEffect(() => {
    if (hasUserInteracted) {
      setActive(disabled ? false : filterValue.length > 0);
    }
  }, [filterValue, hasUserInteracted, disabled]);

  const createQueryString = useCallback(
    (name: string, value: string, resetPage = false) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value.trim() !== "") {
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

  // Обновляем URL только при пользовательских действиях
  useEffect(() => {
    if (hasUserInteracted && debouncedFilterValue !== undefined) {
      const currentUrlValue = searchParams.get(name) || "";
      const currentValueString =
        debouncedFilterValue.length > 0 ? debouncedFilterValue.join(",") : "";

      // Проверяем, действительно ли изменилось значение
      if (currentUrlValue !== currentValueString) {
        router.push(
          pathname + "?" + createQueryString(name, currentValueString, true),
          { scroll: false }
        );
        // Обновляем lastUrlValue чтобы избежать повторной синхронизации
        lastUrlValue.current = currentValueString || null;
      }
    }
  }, [
    debouncedFilterValue,
    hasUserInteracted,
    pathname,
    createQueryString,
    name,
    router,
    searchParams,
  ]);

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
                  setHasUserInteracted(true);
                  if (filterValue.includes(elem.value)) {
                    setFilterValue((prev) =>
                      prev.filter((item) => item !== elem.value)
                    );
                  } else {
                    setFilterValue((prev) => [...prev, elem.value]);
                  }
                }}
                checked={filterValue.includes(elem.value)}
                className={styles.checkbox}
              >
                {elem.title}
              </Checkbox>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckboxFilter;
