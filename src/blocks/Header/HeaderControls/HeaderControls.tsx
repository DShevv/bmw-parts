"use client";
import CatalogButton from "@/components/CatalogButton/CatalogButton";
import styles from "./HeaderControls.module.scss";
import Search from "@/components/Search/Search";
import {
  SvgBag,
  SvgBurger,
  SvgHeart,
  SvgSale,
  SvgSearch,
} from "@/assets/icons/svgs";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import clsx from "clsx";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { CategoryT } from "@/types/types";

type HeaderControlsProps = {
  categories?: CategoryT[];
};

const HeaderControls = observer(({ categories }: HeaderControlsProps) => {
  const { popupStore, stopGlobalStore, cartStore, favoritesStore } =
    globalStore;
  const { search, openPopup, closePopup } = popupStore;
  const { favorites } = favoritesStore;
  const { getTotalCount } = cartStore;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => {
      stopGlobalStore();
    };
  }, []);

  return (
    <div className={styles.container}>
      <CatalogButton categories={categories} />
      <Link href="/promotions" className={styles.promoLink}>
        <SvgSale />
        Акции
      </Link>
      <Search />
      <div className={styles.controls}>
        <button
          className={clsx(styles.controlsLink, styles.search)}
          onClick={() => openPopup("search")}
          aria-label="search"
        >
          <SvgSearch />
        </button>
        {isClient && (
          <>
            <Link
              href={"/favorites"}
              className={styles.controlsLink}
              aria-label="favorites"
            >
              <SvgHeart />
              {Object.keys(favorites).length > 0 && (
                <span className={clsx(styles.cartCount, "body-3")}>
                  {Object.keys(favorites).length > 9
                    ? "9+"
                    : Object.keys(favorites).length}
                </span>
              )}
            </Link>
            <Link
              href={"/cart"}
              className={styles.controlsLink}
              aria-label="cart"
            >
              <SvgBag />
              {getTotalCount() > 0 && (
                <span className={clsx(styles.cartCount, "body-3")}>
                  {getTotalCount() > 9 ? "9+" : getTotalCount()}
                </span>
              )}
            </Link>
          </>
        )}
        <button
          className={clsx(styles.controlsLink, styles.burger)}
          onClick={() => openPopup("menu")}
          aria-label="menu"
        >
          <SvgBurger />
        </button>
      </div>
      <AnimatePresence>
        {search && (
          <SearchPopup isActive={search} onClose={() => closePopup("search")} />
        )}
      </AnimatePresence>
    </div>
  );
});

export default HeaderControls;
