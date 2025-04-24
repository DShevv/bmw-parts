"use client";
import { SvgArrow, SvgBurger } from "@/assets/icons/svgs";
import styles from "./CatalogButton.module.scss";
import clsx from "clsx";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/dumpy-data";
import useOutsideClick from "@/utils/useOutsideClick";

const CatalogButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <>
      <button
        className={clsx(styles.button, "t-button")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SvgBurger />
        <span>Каталог</span>
      </button>

      {isOpen && (
        <div className={styles.menu} ref={ref}>
          <div className={styles.categories}>
            {categories.map((category) => (
              <Link
                onMouseEnter={() => setActiveCategory(category)}
                key={category.id}
                href={"/catalog"}
                className={clsx(styles.category, "body-1", {
                  [styles.active]: activeCategory.id === category.id,
                })}
              >
                <Image src={category.image} alt={category.name} />
                <span>{category.name}</span>
                <SvgArrow />
              </Link>
            ))}
          </div>
          <div className={styles.activeCategory}>
            <div className={styles.scrollContainer}>
              <div className={clsx("h4", styles.title)}>
                {activeCategory.name}
              </div>
              <div className={styles.content}>
                <Link href={"/catalog"} className={clsx("body-2", styles.item)}>
                  Все товары
                </Link>
                {activeCategory.children.map((child) => (
                  <Link
                    key={child.id}
                    href={"/catalog"}
                    className={clsx("body-2", styles.item)}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogButton;
