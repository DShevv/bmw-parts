"use client";
import styles from "./CatalogBlock.module.scss";
import wheels from "@/assets/images/wheels.png";
import tools from "@/assets/images/tools-hd.png";
import oil from "@/assets/images/oil-hd.png";
import carCare from "@/assets/images/car-care.png";
import clsx from "clsx";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import CatalogBlockItem from "./CatalogBlockItem/CatalogBlockItem";
import { useState } from "react";

const CatalogBlock = () => {
  const [activeItem, setActiveItem] = useState(0);

  const handleActiveItem = (index: number) => {
    setActiveItem(index);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>Каталог товаров</h2>
        <MainButton
          type="link"
          href="/catalog"
          style="secondary"
          className={styles.button}
        >
          В каталог
        </MainButton>
      </div>
      <div className={styles.container}>
        <CatalogBlockItem
          href="/catalog/wheels"
          title="Диски"
          image={wheels}
          imageAlt="wheels"
          isActive={activeItem === 0}
          setIsActive={() => handleActiveItem(0)}
        />
        <CatalogBlockItem
          href="/catalog/tools"
          title="Инструменты"
          image={tools}
          imageAlt="tools"
          isActive={activeItem === 1}
          setIsActive={() => handleActiveItem(1)}
        />
        <CatalogBlockItem
          href="/catalog/oil"
          title="Масла и автохимия"
          image={oil}
          imageAlt="oil"
          isActive={activeItem === 2}
          setIsActive={() => handleActiveItem(2)}
        />
        <CatalogBlockItem
          href="/catalog/car-care"
          title="Уход за автомобилем"
          image={carCare}
          imageAlt="carCare"
          isActive={activeItem === 3}
          setIsActive={() => handleActiveItem(3)}
        />
        <MainButton
          type="link"
          href="/catalog"
          style="secondary"
          className={styles.button}
        >
          В каталог
        </MainButton>
      </div>
    </section>
  );
};

export default CatalogBlock;
