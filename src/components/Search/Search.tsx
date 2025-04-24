"use client";
import { SvgSearch } from "@/assets/icons/svgs";
import styles from "./Search.module.scss";
import clsx from "clsx";
import MainButton from "../Buttons/MainButton/MainButton";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "@/utils/useDebounce";
import { searchData } from "@/data/dumpy-data";
import Image from "next/image";
import Link from "next/link";
import { slugifyWithOpts } from "@/utils/helper";
import useOutsideClick from "@/utils/useOutsideClick";

const Search = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1500);
  const [results, setResults] = useState<typeof searchData>([]);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setResults([]));

  const handleSearch = useCallback(() => {
    console.log("Поисковый запрос:", debouncedSearch);
    setResults(
      searchData.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch();
    }
  }, [debouncedSearch, handleSearch]);

  return (
    <div className={styles.container} ref={ref}>
      <SvgSearch />
      <input
        type="text"
        placeholder="Поиск по сайту"
        className={clsx("t-placeholder", styles.input)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleSearch}
      />

      {results.length > 0 && (
        <div className={styles.results}>
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
        </div>
      )}
    </div>
  );
};

export default Search;
