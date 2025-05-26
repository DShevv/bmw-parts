"use client";
import { SvgArrow, SvgBurger } from "@/assets/icons/svgs";
import styles from "./CatalogButton.module.scss";
import clsx from "clsx";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryT } from "@/types/types";

type CatalogButtonProps = {
  categories?: CategoryT[];
};

const CatalogButton = ({ categories }: CatalogButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryT | null>(
    categories?.[0] ?? null
  );

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  return (
    <>
      <Link
        href={"/catalog"}
        className={clsx(styles.button, "t-button")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SvgBurger />
        <span>Каталог</span>
      </Link>

      {isOpen && (
        <div
          className={styles.menu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.categories}>
            {categories?.map((category) => (
              <Link
                onMouseEnter={() => setActiveCategory(category)}
                key={category.id}
                href={`/catalog/${category.slug}`}
                className={clsx(styles.category, "body-1", {
                  [styles.active]: activeCategory?.id === category.id,
                })}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORE_URL}/${category.photo_path}`}
                  alt={category.name}
                  width={36}
                  height={36}
                />
                <span>{category.name}</span>
                <SvgArrow />
              </Link>
            ))}
          </div>
          {activeCategory && (
            <div className={styles.activeCategory}>
              <div className={styles.scrollContainer}>
                <div className={clsx("h4", styles.title)}>
                  {activeCategory?.name}
                </div>
                <div className={styles.content}>
                  <Link
                    href={`/catalog/${activeCategory?.slug}`}
                    className={clsx("body-2", styles.item)}
                  >
                    Все товары
                  </Link>
                  {activeCategory?.subcategories?.map((child) => (
                    <Link
                      key={child.id}
                      href={`/catalog/${child.slug}`}
                      className={clsx("body-2", styles.item)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CatalogButton;
