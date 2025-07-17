"use client";
import clsx from "clsx";
import styles from "./DropdownFilter.module.scss";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SvgArrowFilter } from "@/assets/icons/svgs";
import { useDebounce } from "@/utils/useDebounce";
import Select from "@/components/Select/Select";

interface CheckboxFilterProps {
  name: string;
  title: string;
  disabled?: boolean;
  data: { title: string; value: string }[];
  direction?: "top" | "bottom";
}

const DropdownFilter = ({
  name,
  title,
  disabled = false,
  data,
  direction = "bottom",
}: CheckboxFilterProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const value = params.get(name);
  const [filterValue, setFilterValue] = useState<string>(value || "");
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const debouncedFilterValue = useDebounce(filterValue, 0);
  const router = useRouter();
  const pathname = usePathname();
  const [isActive, setActive] = useState(
    disabled ? false : filterValue.length > 0
  );

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

  useEffect(() => {
    if (value) {
      setFilterValue(value);
      setActive(true);
    } else {
      setFilterValue("");
      setActive(false);
    }
    // Сбрасываем hasUserInteracted при изменении URL извне
    setHasUserInteracted(false);
  }, [value]);

  useEffect(() => {
    // Обновляем URL только при пользовательских действиях
    if (hasUserInteracted && debouncedFilterValue !== undefined) {
      const currentUrlValue = searchParams.get(name) || "";
      const targetValue =
        debouncedFilterValue === "Все" ? "" : debouncedFilterValue;

      // Проверяем, действительно ли изменилось значение
      if (currentUrlValue !== targetValue) {
        if (debouncedFilterValue === "Все") {
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
              createQueryString(name, debouncedFilterValue, true),
            { scroll: false }
          );
        }
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

  // Находим текущую выбранную опцию или используем дефолтную
  const getCurrentOption = () => {
    if (!filterValue) {
      return { title: "Все", value: "" };
    }
    const found = data.find((item) => item.value === filterValue);
    return found || { title: "Все", value: "" };
  };

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
            <Select
              options={[{ title: "Все", value: "" }, ...data]}
              onChange={(value) => {
                setHasUserInteracted(true);
                setFilterValue(value);
              }}
              defaultValue={getCurrentOption()}
              className={styles.select}
              direction={direction}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownFilter;
