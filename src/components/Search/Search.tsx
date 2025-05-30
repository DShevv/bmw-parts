"use client";
import { SvgSearch } from "@/assets/icons/svgs";
import styles from "./Search.module.scss";
import clsx from "clsx";
import MainButton from "../Buttons/MainButton/MainButton";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "@/utils/useDebounce";
import Image from "next/image";
import Link from "next/link";
import useOutsideClick from "@/utils/useOutsideClick";
import { ProductT } from "@/types/types";
import { getProducts } from "@/services/CatalogService";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";

const Search = observer(() => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1500);
  const [results, setResults] = useState<ProductT[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { cartStore, notificationStore, popupStore } = globalStore;
  const { addToCart } = cartStore;
  const { setNotification } = notificationStore;
  const { openPopup } = popupStore;

  useOutsideClick(ref, () => {
    setResults([]);
    setSearch("");
  });

  const handleSearch = useCallback(async () => {
    const products = await getProducts({
      search: debouncedSearch,
    });
    setResults(products?.data ?? []);
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
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
        onFocus={() => {
          setSearch("");
        }}
      />

      {results.length > 0 && (
        <div className={styles.results}>
          <div className={styles.scrollContainer}>
            <div className={styles.items}>
              {results.map((item) => (
                <Link
                  href={`/catalog/${item.category.slug}/${item.slug}`}
                  key={item.id}
                  className={styles.item}
                  onClick={() => {
                    setSearch("");
                    setResults([]);
                  }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORE_URL}/${item.images[0]}`}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <div className={styles.info}>
                    <div className={clsx("body-1", styles.title)}>
                      {item.name}
                      <span className={"body-4"}>Арт. {item.sku}</span>
                    </div>
                    <div className={styles.controls}>
                      <div
                        className={clsx("h4", styles.price, {
                          [styles.sale]: Number(item.discount) > 0,
                        })}
                      >
                        {Number(item.discount) > 0
                          ? `${
                              Number(item.price) *
                              (1 - Number(item.discount) / 100)
                            } BYN `
                          : `${Number(item.price)} BYN `}
                        {Number(item.discount) > 0 && (
                          <span className={clsx("body-4", styles.oldPrice)}>
                            {Number(item.price)} BYN
                          </span>
                        )}
                      </div>
                      <MainButton
                        style={item.in_stock ? "primary" : "secondary"}
                        className={styles.resultButton}
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.in_stock) {
                            addToCart(item);
                            setNotification(
                              "Товар добавлен в корзину",
                              undefined,
                              "success"
                            );
                          } else {
                            openPopup("order", {
                              product: item,
                              count: 1,
                            });
                          }
                        }}
                      >
                        {item.in_stock ? "Купить" : "Заказать"}
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
});

export default Search;
