"use client";
import Select from "@/components/Select/Select";
import styles from "./page.module.scss";
import clsx from "clsx";
import FilterButton from "@/components/Buttons/FilterButton/FilterButton";
import { popularProducts } from "@/data/dumpy-data";
import ProductItem from "@/components/ProductItem/ProductItem";
import Pagination from "@/components/Pagination/Pagination";
const page = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={clsx("body-4", styles.count)}>
          товаров на странице:
          <span className="body-1">9</span>
        </div>

        <div className={styles.mobileContainer}>
          <span className={clsx("body-1", styles.sort)}>Сортировка:</span>
          <Select
            className={styles.select}
            onChange={(value) => {
              console.log(value);
            }}
            defaultValue="По алфавиту А-Я"
            options={[
              "Сначала дешевые",
              "Сначала дорогие",
              "По алфавиту А-Я",
              "По алфавиту Я-А",
            ]}
          />
          <FilterButton />
        </div>
      </div>

      <div className={styles.container}>
        {popularProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        current={2}
        max={10}
        maxPerView={5}
        className={styles.pagination}
      />
    </div>
  );
};

export default page;
