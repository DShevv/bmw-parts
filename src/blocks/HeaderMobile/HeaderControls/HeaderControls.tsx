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
import { useEffect, useState } from "react";

const HeaderControls = observer(({ logo }: { logo: string }) => {
  const { popupStore, stopGlobalStore, favoritesStore, cartStore } =
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
      <Logo className={styles.logo} image={logo} />
      <CatalogButton />
      <Search />
      <div className={styles.controls}>
        <button
          className={clsx(styles.controlsLink, styles.search)}
          onClick={() => openPopup("search")}
          aria-label="search"
        >
          <SvgSearch />
        </button>
        <Link
          href={"/favorites"}
          className={styles.controlsLink}
          aria-label="favorites"
        >
          <SvgHeart />
          {isClient && Object.keys(favorites).length > 0 && (
            <span className={clsx(styles.cartCount, "body-3")}>
              {Object.keys(favorites).length > 9
                ? "9+"
                : Object.keys(favorites).length}
            </span>
          )}
        </Link>
        <Link href={"/cart"} className={styles.controlsLink} aria-label="cart">
          <SvgBag />
          {isClient && getTotalCount() > 0 && (
            <span className={clsx(styles.cartCount, "body-3")}>
              {getTotalCount() > 9 ? "9+" : getTotalCount()}
            </span>
          )}
        </Link>
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
