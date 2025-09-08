"use client";
import { SvgClose, SvgSearch } from "@/assets/icons/svgs";
import styles from "./SearchPopup.module.scss";
import clsx from "clsx";
import MainButton from "../Buttons/MainButton/MainButton";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "@/utils/useDebounce";
import Image from "next/image";
import Link from "next/link";
import useOutsideClick from "@/utils/useOutsideClick";
import { motion as m } from "motion/react";
import { ProductT } from "@/types/types";
import { getProducts } from "@/services/CatalogService";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { useRouter } from "next/navigation";

interface SearchPopupProps {
  isActive: boolean;
  onClose: () => void;
}

const SearchPopup = observer(({ isActive, onClose }: SearchPopupProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1500);
  const [results, setResults] = useState<ProductT[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { cartStore, notificationStore, popupStore } = globalStore;
  const { addToCart } = cartStore;
  const { setNotification } = notificationStore;
  const { openPopup } = popupStore;
  const router = useRouter();
  const handleSearch = useCallback(async () => {
    const products = await getProducts({
      search: debouncedSearch,
    });
    setResults(products?.data ?? []);
  }, [debouncedSearch]);

  useOutsideClick(
    ref,
    () => {
      setResults([]);
      onClose();
    },
    "SearchPopup"
  );

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      handleSearch();
    }

    if (debouncedSearch.length === 0) {
      setResults([]);
    }
  }, [debouncedSearch, handleSearch]);

  return (
    <m.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(styles.wrapper, { [styles.active]: isActive })}
      ref={ref}
    >
      <div className={clsx(styles.container)}>
        <SvgSearch />
        <input
          autoFocus
          type="text"
          placeholder="Поиск по сайту"
          className={clsx("t-placeholder", styles.input)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => {
            setSearch("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?search=${search}`);
              setResults([]);
              onClose();
            }
          }}
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
                  href={`/catalog/${item.category.slug}/${item.slug}`}
                  key={item.id}
                  className={styles.item}
                  onClick={() => {
                    setSearch("");
                    setResults([]);
                    onClose();
                  }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORE_URL}/${item.images[0].image_path}`}
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
        </m.div>
      )}
    </m.div>
  );
});

export default SearchPopup;
