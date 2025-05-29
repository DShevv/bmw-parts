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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isTop) {
      setIsHide(false);
    }
  }, [isTop]);

  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHide(false);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(headerRef.current);

    return () => observer.disconnect();
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
          layout="preserve-aspect"
          className={clsx(styles.header, styles.fixed, {
            [styles.top]: isTop,
          })}
          initial={{ height: "auto" }}
          animate={{ height: isHide ? 0 : "auto" }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <AnimatePresence>
            {!isHide && (
              <m.div
                key="header-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                style={{ overflow: "hidden" }}
              >
                {isTop && (
                  <m.div
                    layout="preserve-aspect"
                    className={styles.info}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <ul className={styles.menu}>
                      <li>
                        <Link
                          href={"/"}
                          className={clsx("body-2", styles.link)}
                        >
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
                        <Link
                          href={"/help"}
                          className={clsx("body-2", styles.link)}
                        >
                          Помощь покупателю
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/news"}
                          className={clsx("body-2", styles.link)}
                        >
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
                )}
                <m.div
                  layout="preserve-aspect"
                  className={styles.wrapper}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
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
              </m.div>
            )}
          </AnimatePresence>

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
