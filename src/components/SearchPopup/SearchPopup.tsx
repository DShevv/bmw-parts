"use client";
import { SvgClose, SvgSearch } from "@/assets/icons/svgs";
import styles from "./SearchPopup.module.scss";
import clsx from "clsx";
import MainButton from "../Buttons/MainButton/MainButton";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/utils/useDebounce";
import { searchData } from "@/data/dumpy-data";
import Image from "next/image";
import Link from "next/link";
import { slugifyWithOpts } from "@/utils/helper";
import useOutsideClick from "@/utils/useOutsideClick";
import { motion as m } from "motion/react";

interface SearchPopupProps {
  isActive: boolean;
  onClose: () => void;
}

const SearchPopup = ({ isActive, onClose }: SearchPopupProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1500);
  const [results, setResults] = useState<typeof searchData>([]);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setResults([]);
    onClose();
  });

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch();
    }
  }, [debouncedSearch]);

  const handleSearch = () => {
    if (debouncedSearch.length > 1) {
      console.log("Поисковый запрос:", debouncedSearch);
      setResults(
        searchData.filter((item) =>
          item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    }
  };

  return (
    <m.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(styles.wrapper, { [styles.active]: isActive })}
    >
      <div className={clsx(styles.container)} ref={ref}>
        <SvgSearch />
        <input
          autoFocus
          type="text"
          placeholder="Поиск по сайту"
          className={clsx("t-placeholder", styles.input)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleSearch}
        />

        <SvgClose
          className={clsx(styles.close, {
            [styles.active]: results.length > 0,
          })}
          onClick={() => {
            setSearch("");
            onClose();
            setResults([]);
          }}
        />
      </div>
      {results.length > 0 && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.results}
        >
          <div className={styles.scrollContainer}>
            <div className={styles.items}>
              {results.map((item) => (
                <Link
                  href={`/catalog/${slugifyWithOpts(item.name)}`}
                  key={item.id}
                  className={styles.item}
                >
                  <Image src={item.image} alt={item.name} />
                  <div className={styles.info}>
                    <div className={clsx("body-1", styles.title)}>
                      {item.name}
                      <span className={"body-4"}>Арт. {item.sku}</span>
                    </div>
                    <div className={styles.controls}>
                      <div
                        className={clsx("h4", styles.price, {
                          [styles.sale]: item.discount > 0,
                        })}
                      >
                        {item.discount > 0
                          ? `${item.price * (1 - item.discount / 100)} BYN `
                          : `${item.price} BYN `}
                        {item.discount > 0 && (
                          <span className={clsx("body-4", styles.oldPrice)}>
                            {item.price} BYN
                          </span>
                        )}
                      </div>
                      <MainButton className={styles.resultButton}>
                        Купить
                      </MainButton>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </m.div>
      )}
    </m.div>
  );
};

export default SearchPopup;
