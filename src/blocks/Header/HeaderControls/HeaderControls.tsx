"use client";
import Logo from "@/components/Logo/Logo";
import CatalogButton from "@/components/CatalogButton/CatalogButton";
import styles from "./HeaderControls.module.scss";
import Search from "@/components/Search/Search";
import { SvgBag, SvgBurger, SvgHeart, SvgSearch } from "@/assets/icons/svgs";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import clsx from "clsx";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import { AnimatePresence } from "motion/react";

const HeaderControls = observer(() => {
  const { popupStore } = globalStore;
  const { search, openPopup, closePopup } = popupStore;

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <CatalogButton />
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
