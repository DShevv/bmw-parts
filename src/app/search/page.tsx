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
    // Получаем все параметры спецификаций из URL
    const specificationParams: { [key: string]: string | null } = {};

    // Проходим по всем параметрам и находим те, что начинаются с "specification_"
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("specification_")) {
        specificationParams[key] = value;
      }
    }

    return {
      search: params.get("search"),
      category: undefined,
      generation: params.get("generation"),
      series: params.get("series"),
      body: params.get("body"),
      year: params.get("year"),
      price: params.get("price"),
      transmission: params.get("transmission"),
      page: parseInt(params.get("page") || "1", 10),
      sort: sort,
      ...specificationParams,
    };
  }, [params, sort, searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(searchOptions);

      setProducts(products?.data ?? []);
      setPage({
        current: parseInt(params.get("page") || "1", 10),
        max: products?.last_page ?? 1,
      });
    };
    fetchProducts();
  }, [searchOptions, params]);

  const handleSortChange = useCallback(
    (value: string) => {
      let sortValue = "name";

      switch (value) {
        case "cheap":
          sortValue = "price";
          break;
        case "expensive":
          sortValue = "-price";
          break;
        case "a-z":
          sortValue = "name";
          break;
        case "z-a":
          sortValue = "-name";
          break;
      }

      setSort(sortValue);

      // Сбрасываем page при изменении сортировки
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("page");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${newParams.toString()}`
      );
    },
    [searchParams]
  );

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
            defaultValue={{
              title:
                sort === "price"
                  ? "Сначала дешевые"
                  : sort === "-price"
                  ? "Сначала дорогие"
                  : sort === "-name"
                  ? "По алфавиту Я-А"
                  : "По алфавиту А-Я",
              value:
                sort === "price"
                  ? "cheap"
                  : sort === "-price"
                  ? "expensive"
                  : sort === "-name"
                  ? "z-a"
                  : "a-z",
            }}
            options={[
              { title: "Сначала дешевые", value: "cheap" },
              { title: "Сначала дорогие", value: "expensive" },
              { title: "По алфавиту А-Я", value: "a-z" },
              { title: "По алфавиту Я-А", value: "z-a" },
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
