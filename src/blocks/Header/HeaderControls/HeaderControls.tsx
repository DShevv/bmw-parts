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
import { useEffect } from "react";
import { CategoryT } from "@/types/types";

type HeaderControlsProps = {
  categories?: CategoryT[];
};

const HeaderControls = observer(({ categories }: HeaderControlsProps) => {
  const { popupStore, stopGlobalStore } = globalStore;
  const { search, openPopup, closePopup } = popupStore;

  useEffect(() => {
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
        >
          <SvgSearch />
        </button>
        <Link href={"/favorites"} className={styles.controlsLink}>
          <SvgHeart />
        </Link>
        <Link href={"/cart"} className={styles.controlsLink}>
          <SvgBag />
        </Link>
        <button
          className={clsx(styles.controlsLink, styles.burger)}
          onClick={() => openPopup("menu")}
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
