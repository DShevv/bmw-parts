"use client";
import Select from "@/components/Select/Select";
import styles from "./page.module.scss";
import clsx from "clsx";
import FilterButton from "@/components/Buttons/FilterButton/FilterButton";
import ProductItem from "@/components/ProductItem/ProductItem";
import Pagination from "@/components/Pagination/Pagination";
import { getProducts } from "@/services/CatalogService";
import { ProductT } from "@/types/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [products, setProducts] = useState<ProductT[] | null>(null);
  const [page, setPage] = useState<{ current: number; max: number }>({
    current: 1,
    max: 1,
  });
  const [sort, setSort] = useState<string>("name");
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );
  const searchOptions = useMemo(() => {
    return {
      generation: params.get("generation"),
      series: params.get("series"),
      body: params.get("body"),
      year: params.get("year"),
      price: params.get("price"),
      transmission: params.get("transmission"),
      sort: sort,
    };
  }, [params, sort]);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log(searchOptions);
      const products = await getProducts(searchOptions);

      setProducts(products?.data ?? []);
      setPage({
        current: products?.current_page ?? 1,
        max: products?.last_page ?? 1,
      });
    };
    fetchProducts();
  }, [searchOptions]);

  const handleSortChange = useCallback((value: string) => {
    let sortValue = "name";

    switch (value) {
      case "Сначала дешевые":
        sortValue = "price";
        break;
      case "Сначала дорогие":
        sortValue = "-price";
        break;
      case "По алфавиту А-Я":
        sortValue = "name";
        break;
      case "По алфавиту Я-А":
        sortValue = "-name";
        break;
    }

    setSort(sortValue);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={clsx("body-4", styles.count)}>
          товаров на странице:
          <span className="body-1">{products?.length}</span>
        </div>

        <div className={styles.mobileContainer}>
          <span className={clsx("body-1", styles.sort)}>Сортировка:</span>
          <Select
            className={styles.select}
            onChange={handleSortChange}
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
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {page.max > 1 && (
        <Pagination
          current={page.current}
          max={page.max}
          maxPerView={5}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

export default Page;
