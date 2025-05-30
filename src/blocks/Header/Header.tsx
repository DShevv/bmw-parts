"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import clsx from "clsx";
import HeaderControls from "./HeaderControls/HeaderControls";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import { CategoryT, ContactsT, SettingT } from "@/types/types";
import { AnimatePresence, motion as m } from "motion/react";
import { SvgArrowDown } from "@/assets/icons/svgs";

const Header = ({
  categories,
  contacts,
  settings,
}: {
  categories: CategoryT[] | undefined;
  contacts: ContactsT | undefined;
  settings: SettingT | undefined;
}) => {
  const [isTop, setIsTop] = useState(true);
  const [isHide, setIsHide] = useState(false);
  const [isPastViewport, setIsPastViewport] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
      setIsPastViewport(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <m.header ref={headerRef} layout className={styles.header}>
        <AnimatePresence>
          <m.div
            layout
            className={styles.info}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              opacity: { duration: 0.2 },
            }}
          >
            <ul className={styles.menu}>
              <li>
                <Link href={"/"} className={clsx("body-2", styles.link)}>
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href={"/find-parts"}
                  className={clsx("body-2", styles.link)}
                >
                  Подбор запчастей для BMW
                </Link>
              </li>
              <li>
                <Link href={"/help"} className={clsx("body-2", styles.link)}>
                  Помощь покупателю
                </Link>
              </li>
              <li>
                <Link href={"/news"} className={clsx("body-2", styles.link)}>
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href={"/contacts"}
                  className={clsx("body-2", styles.link)}
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </m.div>
        </AnimatePresence>
        <m.div layout className={styles.wrapper}>
          <div className={styles.inner}>
            <HeaderInfo
              contacts={contacts ?? undefined}
              settings={settings ?? undefined}
            />
            <HeaderControls categories={categories ?? undefined} />
          </div>
        </m.div>
      </m.header>
      <AnimatePresence>
        <m.header
          layout
          className={clsx(styles.header, styles.fixed, {
            [styles.top]: isTop,
          })}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isPastViewport ? 1 : 0,
          }}
          transition={{
            opacity: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <m.div className={styles.content} layout>
            <AnimatePresence>
              {!isHide && (
                <m.div
                  layout
                  className={styles.wrapper}
                  initial={{ height: 0, padding: 0 }}
                  animate={{
                    height: isHide ? 0 : "auto",
                    padding: isHide ? 0 : `${12}px 0 ${16}px 0`,
                  }}
                  exit={{ height: 0, padding: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <div className={styles.inner}>
                    <HeaderInfo
                      contacts={contacts ?? undefined}
                      settings={settings ?? undefined}
                    />
                    <HeaderControls categories={categories ?? undefined} />
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>

          <div
            className={clsx(styles.hide, { [styles.active]: isHide })}
            onClick={() => setIsHide(!isHide)}
          >
            <SvgArrowDown />
          </div>
        </m.header>
      </AnimatePresence>
    </>
  );
};

export default Header;
