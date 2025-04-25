"use client";
import styles from "./CatalogBlockItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

interface CatalogBlockItemProps {
  href: string;
  title: string;
  image: StaticImageData;
  imageAlt: string;
  isActive: boolean;
  setIsActive: () => void;
}

const CatalogBlockItem = ({
  href,
  title,
  image,
  imageAlt,
  isActive = false,
  setIsActive,
}: CatalogBlockItemProps) => {
  const containerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const checkPosition = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const screenCenter = windowHeight / 2;

      if (Math.abs(elementCenter - screenCenter) < rect.height / 2) {
        setIsActive();
      }
    };

    window.addEventListener("scroll", checkPosition);
    checkPosition();

    return () => window.removeEventListener("scroll", checkPosition);
  }, [setIsActive]);

  return (
    <Link
      href={href}
      className={clsx(styles.item, { [styles.active]: isActive })}
      ref={containerRef}
    >
      <h3 className={clsx("h4", styles.itemTitle)}>{title}</h3>
      <Image src={image} alt={imageAlt} />
    </Link>
  );
};

export default CatalogBlockItem;
